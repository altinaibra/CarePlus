using carePlusApi.DTO;
using carePlusApi.Models;
using carePlusApi.Repository;
using CarePlusApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace carePlusApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly DepartmentRepository _repository;

        public DepartmentsController(DepartmentRepository repository)
        {
            _repository = repository;
        }

        // GET: api/departments
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var departments = await _repository.GetAllAsync();

                var result = departments.Select(d => new DepartmentDto
                {
                    Id = d.Id,
                    Name = d.Name
                });

                return Ok(result.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        // GET: api/departments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var dept = await _repository.GetByIdAsync(id);
            if (dept == null) return NotFound();

            return Ok(new DepartmentDto
            {
                Id = dept.Id,
                Name = dept.Name
            });
        }

        // POST
        [HttpPost]
        public async Task<IActionResult> Create(DepartmentDto dto)
        {
            var department = new Department
            {
                Name = dto.Name
            };

            var created = await _repository.AddAsync(department);

            dto.Id = created.Id;
            return Ok(dto);
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DepartmentDto dto)
        {
            var dept = await _repository.GetByIdAsync(id);
            if (dept == null) return NotFound();

            dept.Name = dto.Name;

            await _repository.UpdateAsync(dept);
            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _repository.DeleteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}
