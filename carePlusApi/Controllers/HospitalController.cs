using Microsoft.AspNetCore.Mvc;
using carePlusApi.DTO;
using carePlusApi.Repositories;

namespace carePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly HospitalRepository _repository;

        public HospitalController(HospitalRepository repository)
        {
            _repository = repository;
        }

        // GET: api/hospital
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hospitals = await _repository.GetAllAsync();
            return Ok(hospitals);
        }

        // GET: api/hospital/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var hospital = await _repository.GetByIdAsync(id);
            if (hospital == null) return NotFound();
            return Ok(hospital);
        }

        // POST: api/hospital
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HospitalDto dto)
        {
            var hospital = await _repository.CreateAsync(dto);
            return Ok(hospital);
        }

        // PUT: api/hospital/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HospitalDto dto)
        {
            var hospital = await _repository.UpdateAsync(id, dto);
            if (hospital == null) return NotFound();

            return Ok(hospital);
        }

        // DELETE: api/hospital/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _repository.DeleteAsync(id);
            if (!deleted) return NotFound();

            return Ok(new { message = "Hospital deleted successfully" });
        }
    }
}