using CarePlusApi.DTO;
using CarePlusApi.Models;
using CarePlusApi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CarePlusApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionController : ControllerBase
    {
        private readonly PrescriptionRepository _repository;

        public PrescriptionController(PrescriptionRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Prescription
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var prescriptions = await _repository.GetAllAsync();
            return Ok(prescriptions);
        }

        // GET: api/Prescription/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var prescription = await _repository.GetByIdAsync(id);
            if (prescription == null) return NotFound();
            return Ok(prescription);
        }

        // POST: api/Prescription
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PrescriptionDto dto)
        {
            if (dto == null) return BadRequest();

            var prescription = await _repository.CreateAsync(dto);
            return Ok(prescription);
        }

        // DELETE: api/Prescription/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}