using Microsoft.AspNetCore.Mvc;
using carePlusApi.DTO;
using carePlusApi.Repositories;

namespace carePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypesOfAnalysesController : ControllerBase
    {
        private readonly ITypesOfAnalysesRepository _repo;

        public TypesOfAnalysesController(ITypesOfAnalysesRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repo.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _repo.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TypeOfAnalysesDto dto)
        {
            var created = await _repo.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TypeOfAnalysesDto dto)
        {
            var updated = await _repo.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _repo.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
