namespace WebApplication1.Models.DTO
{
    public class PacienteAnamneseDTO: Paciente {

        public required AnamneseDTO Anamnese { get; set; }
    }
}
