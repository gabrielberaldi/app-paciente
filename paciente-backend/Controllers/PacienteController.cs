using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Models.DTO;
using WebApplication1.Repositories;


namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController(PacienteRepository pacienteRepository) : ControllerBase
    {
        private readonly PacienteRepository _pacienteRepository = pacienteRepository;

        [HttpGet]
        public ActionResult<IEnumerable<Paciente>> Get([FromQuery]int page = 0, [FromQuery]int pageSize = 10, [FromQuery]string title = "")
        {
            try
            {
                return Ok(_pacienteRepository.GetAll(page, pageSize, title));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<PacienteAnamneseDTO> Get(int id)
        {
            try
            {
                PacienteAnamneseDTO paciente = _pacienteRepository.GetById(id);
                if(paciente == null)
                {
                    return NotFound();
                }

                return Ok(paciente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<PacienteAnamneseDTO> Post([FromBody] PacienteAnamneseDTO pacienteAnamneseDTO)
        {
            try
            {
                return Ok(_pacienteRepository.Insert(pacienteAnamneseDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<PacienteAnamneseDTO> Put(int id, [FromBody] PacienteAnamneseDTO pacienteAnamneseDTO)
        {
            try
            {
                return Ok(_pacienteRepository.Update(id, pacienteAnamneseDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (_pacienteRepository.Delete(id) > 0) return Ok();
                else return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
