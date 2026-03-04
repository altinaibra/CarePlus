using CarePlusApi.Models;
using carePlusApi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentDetailsController : ControllerBase
    {
        private readonly DepartmentDetailsRepository _repository;

        public DepartmentDetailsController(DepartmentDetailsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/departmentdetails
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var all = await _repository.GetAllAsync();
            return Ok(all);
        }

        // GET: api/departmentdetails/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var detail = await _repository.GetByIdAsync(id);
            if (detail == null) return NotFound();

            return Ok(detail);
        }

        // GET: api/departmentdetails/by-department/{departmentId}
        [HttpGet("by-department/{departmentId:int}")]
        public async Task<IActionResult> GetByDepartment(int departmentId)
        {
            var detail = await _repository.GetByDepartmentIdAsync(departmentId);
            if (detail == null) return NotFound();

            return Ok(detail);
        }

        // POST: api/departmentdetails
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DepartmentDetail detail)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var created = await _repository.AddAsync(detail);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/departmentdetails/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] DepartmentDetail detail)
        {
            if (id != detail.Id) return BadRequest("ID mismatch.");

            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.DepartmentId = detail.DepartmentId;
            existing.ShortDescription = detail.ShortDescription;
            existing.Services = detail.Services;
            existing.Location = detail.Location;
            existing.Hours = detail.Hours;
            existing.Phone = detail.Phone;
            existing.Highlight1Label = detail.Highlight1Label;
            existing.Highlight1Value = detail.Highlight1Value;
            existing.Highlight2Label = detail.Highlight2Label;
            existing.Highlight2Value = detail.Highlight2Value;

            var success = await _repository.UpdateAsync(existing);
            if (!success) return StatusCode(500, "Failed to update department details.");

            return NoContent();
        }

        // DELETE: api/departmentdetails/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _repository.DeleteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}

