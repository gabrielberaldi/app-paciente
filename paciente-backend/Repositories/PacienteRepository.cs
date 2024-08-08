using Dapper;
using System.Data;
using WebApplication1.Models;
using WebApplication1.Models.DTO;

namespace WebApplication1.Repositories
{
    public class PacienteRepository(IDbConnection dbConnection, AnamneseRepository anamneseRepository)
    {
        private readonly IDbConnection _dbConnection = dbConnection;
        private readonly AnamneseRepository _anamneseRepository = anamneseRepository;

        public PagedResult<Paciente> GetAll(int page, int pageSize, string title)
        {

            var parameters = new
            {
                Offset = page,
                PageSize = pageSize,
                Title = $"%{title}%"
            };

            string sql = @"SELECT * FROM paciente
                   WHERE nomeCompleto LIKE @Title
                   OFFSET @Offset LIMIT @PageSize";

            string countSql = @"SELECT COUNT(*) FROM paciente
                               WHERE nomeCompleto LIKE @Title";   

            var pacientes = _dbConnection.Query<Paciente>(sql, parameters).ToList();
            var count = _dbConnection.ExecuteScalar<int>(countSql, parameters);

            return new PagedResult<Paciente>
            {
                Items = pacientes,
                Count = count
            };
        }

        public PacienteAnamneseDTO GetById(long id)
        {
            var parameters = new
            {
                id
            };

            string sql = @"SELECT * FROM paciente p
                       LEFT JOIN anamnese a on p.id = a.idPaciente
                       WHERE p.id = @id";

            PacienteAnamneseDTO? pacienteAnamneseDTO = null;

            _dbConnection.Query<Paciente, AnamneseDTO, PacienteAnamneseDTO>(
                   sql, (paciente, anamnese) =>
                   {
                        pacienteAnamneseDTO ??= new PacienteAnamneseDTO
                        {
                            Id = paciente.Id,
                            NomeCompleto = paciente.NomeCompleto,
                            DataNascimento = paciente.DataNascimento,
                            Idade = paciente.Idade,
                            Sexo = paciente.Sexo,
                            Anamnese = anamnese
                        };
                        return pacienteAnamneseDTO;
                   },
                   parameters,
                   splitOn: "id"
               ).FirstOrDefault();

            return pacienteAnamneseDTO;
        }

        public Paciente Insert(PacienteAnamneseDTO pacienteAnamneseDTO)
        {
            var parameters = new
            {
                nomeCompleto = pacienteAnamneseDTO.NomeCompleto,
                dataNascimento = pacienteAnamneseDTO.DataNascimento,
                sexo = pacienteAnamneseDTO.Sexo,
                idade = pacienteAnamneseDTO.Idade
            };

            string sql = @"INSERT INTO paciente (nomecompleto, datanascimento, sexo, idade)
                        values(@nomeCompleto, @dataNascimento, @sexo, @idade)
                        RETURNING Id";

            long idPaciente = _dbConnection.QuerySingle<long>(sql, parameters);

            if (idPaciente > 0 && pacienteAnamneseDTO.Anamnese != null)
            {
                pacienteAnamneseDTO.Id = idPaciente;
                var anamnese = _anamneseRepository.Insert(idPaciente, pacienteAnamneseDTO.Anamnese);
                pacienteAnamneseDTO.Anamnese = anamnese;
            }

            return pacienteAnamneseDTO;
        }

        public Paciente Update(long id, PacienteAnamneseDTO pacienteAnamneseDTO)
        {
            var parameters = new
            {
                id,
                nomeCompleto = pacienteAnamneseDTO.NomeCompleto,
                dataNascimento = pacienteAnamneseDTO.DataNascimento,
                sexo = pacienteAnamneseDTO.Sexo,
                idade = pacienteAnamneseDTO.Idade
            };

            string sql = @"UPDATE paciente
                        SET nomeCompleto=@nomeCompleto, 
                        dataNascimento=@dataNascimento, 
                        sexo=@sexo, 
                        idade=@idade
                        WHERE id=@id";

            _dbConnection.Execute(sql, parameters);
            _anamneseRepository.Update(id, pacienteAnamneseDTO.Anamnese);
            return pacienteAnamneseDTO;
        }

        public int Delete(long id)
        {
            var parameters = new
            {
                id
            };

            if(_anamneseRepository.Delete(id) <= 0)
            {
                return 0;
            };

            string sql = @"DELETE FROM paciente WHERE id = @id";
            return _dbConnection.Execute(sql, parameters);
        }
    }

}
