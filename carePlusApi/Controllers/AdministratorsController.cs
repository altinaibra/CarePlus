using carePlusApi.Models;
using CarePlusApi.Data;
using CarePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdministratorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdministratorsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdministrators()
        {
            try
            {
                var admins = await _context.Administrators.ToListAsync();
                return Ok(admins);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching administrators", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdministrator(int id)
        {
            try
            {
                var admin = await _context.Administrators.FindAsync(id);
                if (admin == null)
                    return NotFound(new { message = "Administrator not found" });

                return Ok(admin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching administrator", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdministrator([FromBody] Administrator admin)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                _context.Administrators.Add(admin);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAdministrator), new { id = admin.Id }, admin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating administrator", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdministrator(int id, [FromBody] Administrator admin)
        {
            try
            {
                var existingAdmin = await _context.Administrators.FindAsync(id);
                if (existingAdmin == null)
                    return NotFound(new { message = "Administrator not found" });

                existingAdmin.Name = admin.Name;
                existingAdmin.Email = admin.Email;
                existingAdmin.Phone = admin.Phone;

                _context.Administrators.Update(existingAdmin);
                await _context.SaveChangesAsync();

                return Ok(existingAdmin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating administrator", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrator(int id)
        {
            try
            {
                var admin = await _context.Administrators.FindAsync(id);
                if (admin == null)
                    return NotFound(new { message = "Administrator not found" });

                _context.Administrators.Remove(admin);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Administrator deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting administrator", error = ex.Message });
            }
        }
    }
}
