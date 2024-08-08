using System.Data;
using Dapper;
using WebApplication1.Models.DTO;

namespace WebApplication1.Repositories
{
    public class AnamneseRepository(IDbConnection dbConnection)
    {
        private readonly IDbConnection _dbConnection = dbConnection;

        public AnamneseDTO Insert(long idPaciente, AnamneseDTO anamnese)
        {

            var parameters = new
            {
                idPaciente,
                anamnese.QueixaPrincipal,
                anamnese.HistoricoGestacao,
                anamnese.Amamentacao,
                anamnese.ExamesNascimento,
                anamnese.Alimentacao,
                anamnese.DesenvolvimentoMotor,
                anamnese.DesenvolvimentoLinguagem,
                anamnese.ComunicacaoAmbienteSocial,
                anamnese.DoencasComplicacoes,
                anamnese.Sono,
                anamnese.HistoricoFamiliar,
                anamnese.Comportamento,
                anamnese.RotinaDiaria
            };

            string sql = @"INSERT INTO anamnese (idPaciente, queixaPrincipal, historicoGestacao, amamentacao, examesNascimento, alimentacao, 
                desenvolvimentoMotor, desenvolvimentoLinguagem, comunicacaoAmbienteSocial, doencasComplicacoes, 
                sono, historicoFamiliar, comportamento, rotinaDiaria)
                VALUES 
                (@idPaciente, @QueixaPrincipal, @HistoricoGestacao, @Amamentacao, @ExamesNascimento, @Alimentacao, 
                @DesenvolvimentoMotor, @DesenvolvimentoLinguagem, @ComunicacaoAmbienteSocial, @DoencasComplicacoes, 
                @Sono, @HistoricoFamiliar, @Comportamento, @RotinaDiaria)
                RETURNING id";

            _dbConnection.QuerySingle<long>(sql, parameters);
            return anamnese;
        }

        public AnamneseDTO Update(long idPaciente, AnamneseDTO anamnese)
        {
            var parameters = new
            {
                idPaciente,
                anamnese.QueixaPrincipal,
                anamnese.HistoricoGestacao,
                anamnese.Amamentacao,
                anamnese.ExamesNascimento,
                anamnese.Alimentacao,
                anamnese.DesenvolvimentoMotor,
                anamnese.DesenvolvimentoLinguagem,
                anamnese.ComunicacaoAmbienteSocial,
                anamnese.DoencasComplicacoes,
                anamnese.Sono,
                anamnese.HistoricoFamiliar,
                anamnese.Comportamento,
                anamnese.RotinaDiaria
            };

            string sql = @"UPDATE anamnese
	                    SET queixaprincipal=@queixaPrincipal, historicogestacao=@historicogestacao, 
                        amamentacao=@amamentacao, examesnascimento=@examesNascimento, alimentacao=@alimentacao, 
                        desenvolvimentomotor=@desenvolvimentoMotor, desenvolvimentolinguagem=@desenvolvimentoLinguagem, 
                        comunicacaoambientesocial=@comunicacaoambientesocial, doencascomplicacoes=@doencascomplicacoes, sono=@sono, 
                        historicofamiliar=@historicoFamiliar, comportamento=@comportamento, rotinadiaria=@rotinaDiaria
	                    WHERE idPaciente = @idPaciente";

            _dbConnection.Execute( sql, parameters );
            return anamnese;
        }

        public int Delete(long idPaciente)
        {
            var parameters = new
            {
                idPaciente
            };

            string sql = @"DELETE FROM anamnese WHERE idPaciente = @idPaciente";
            return _dbConnection.Execute(sql, parameters);
        }
    }
}
