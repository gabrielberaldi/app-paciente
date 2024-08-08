using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("paciente")]
    public class Paciente
    {
        [Key]
        public long Id { get; set; }
        public required string NomeCompleto { get; set; }
        public DateTime DataNascimento { get; set; }
        public Char Sexo {  get; set; }
        public int Idade { get; set; }
    }
}
