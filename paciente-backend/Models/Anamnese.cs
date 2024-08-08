using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("anamnese")]
    public class Anamnese
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("id")]
        public long IdPaciente { get; set; }
        public required string QueixaPrincipal { get; set; }
        public required string HistoricoGestacao { get; set; }
        public required string Amamentacao { get; set; }
        public required string ExamesNascimento { get; set; }
        public required string Alimentacao { get; set; }
        public required string DesenvolvimentoMotor { get; set; }
        public required string DesenvolvimentoLinguagem { get; set; }
        public required string ComunicacaoAmbienteSocial { get; set; }
        public required string DoencasComplicacoes { get; set; }
        public required string Sono { get; set; }
        public required string HistoricoFamiliar { get; set; }
        public required string Comportamento { get; set; }
        public required string RotinaDiaria { get; set; }
    }
}
