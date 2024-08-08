using Dapper;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class DocumentoRepository(IDbConnection dbConnection)
    {
        private readonly IDbConnection _dbConnection = dbConnection;

        public PagedResult<Documento> GetAllByIdPaciente(long idPaciente, int page, int pageSize)
        {   
            var parameters = new
            {
                idPaciente,
                Offset = page,
                PageSize = pageSize,
            };

            string sql = @"SELECT * FROM documento 
                          WHERE idPaciente=@idPaciente
                          OFFSET @Offset LIMIT @PageSize";

            string countSql = @"SELECT COUNT(*) FROM documento";

            var documentos = _dbConnection.Query<Documento>(sql, parameters).ToList();
            var count = _dbConnection.ExecuteScalar<int>(countSql, parameters);

            return new PagedResult<Documento>
            {
                Items = documentos,
                Count = count
            };
        }
    }
}
