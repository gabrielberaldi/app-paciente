using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApplication1.Enums;

namespace WebApplication1.Models
{
    [Table("documento")]
    public class Documento
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("id")]
        public long IdPaciente { get; set; }
        public required string Nome { get; set; }
        public required TipoDocumento Tipo { get; set; }
        public required DateTime DataUpload { get; set; }
    }
}
