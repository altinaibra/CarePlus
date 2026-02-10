using CarePlusApi.Data;
using CarePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/doctors
        [HttpGet]
        public async Task<IActionResult> GetDoctors()
        {
            try
            {
                var doctors = await _context.Doctors.ToListAsync();
                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching doctors", error = ex.Message });
            }
        }

        // GET: api/doctors/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(int id)
        {
            try
            {
                var doctor = await _context.Doctors.FindAsync(id);
                if (doctor == null)
                    return NotFound(new { message = "Doctor not found" });

                return Ok(doctor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching doctor", error = ex.Message });
            }
        }

        // POST: api/doctors
        [HttpPost]
        public async Task<IActionResult> CreateDoctor([FromBody] Doctor doctor)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                _context.Doctors.Add(doctor);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating doctor", error = ex.Message });
            }
        }

        // PUT: api/doctors/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] Doctor doctor)
        {
            try
            {
                var existingDoctor = await _context.Doctors.FindAsync(id);
                if (existingDoctor == null)
                    return NotFound(new { message = "Doctor not found" });

                existingDoctor.Name = doctor.Name;
                existingDoctor.Specialization = doctor.Specialization;
                existingDoctor.Email = doctor.Email;
                existingDoctor.Phone = doctor.Phone;
                existingDoctor.LicenseNumber = doctor.LicenseNumber;

                _context.Doctors.Update(existingDoctor);
                await _context.SaveChangesAsync();

                return Ok(existingDoctor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating doctor", error = ex.Message });
            }
        }

        // DELETE: api/doctors/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            try
            {
                var doctor = await _context.Doctors.FindAsync(id);
                if (doctor == null)
                    return NotFound(new { message = "Doctor not found" });

                _context.Doctors.Remove(doctor);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Doctor deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting doctor", error = ex.Message });
            }
        }
    }
}
