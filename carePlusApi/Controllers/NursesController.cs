using carePlusApi.Models;
using CarePlusApi.Data;
using CarePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NursesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NursesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetNurses()
        {
            try
            {
                var nurses = await _context.Nurses.ToListAsync();
                return Ok(nurses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching nurses", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNurse(int id)
        {
            try
            {
                var nurse = await _context.Nurses.FindAsync(id);
                if (nurse == null)
                    return NotFound(new { message = "Nurse not found" });

                return Ok(nurse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching nurse", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateNurse([FromBody] Nurse nurse)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                _context.Nurses.Add(nurse);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetNurse), new { id = nurse.Id }, nurse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating nurse", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNurse(int id, [FromBody] Nurse nurse)
        {
            try
            {
                var existingNurse = await _context.Nurses.FindAsync(id);
                if (existingNurse == null)
                    return NotFound(new { message = "Nurse not found" });

                existingNurse.Name = nurse.Name;
                existingNurse.Email = nurse.Email;
                existingNurse.Phone = nurse.Phone;
                existingNurse.LicenseNumber = nurse.LicenseNumber;
                existingNurse.DepartmentId = nurse.DepartmentId;

                _context.Nurses.Update(existingNurse);
                await _context.SaveChangesAsync();

                return Ok(existingNurse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating nurse", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNurse(int id)
        {
            try
            {
                var nurse = await _context.Nurses.FindAsync(id);
                if (nurse == null)
                    return NotFound(new { message = "Nurse not found" });

                _context.Nurses.Remove(nurse);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Nurse deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting nurse", error = ex.Message });
            }
        }
    }
}
