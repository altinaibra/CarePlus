using CarePlusApi.Data;
using CarePlusApi.Models;
using CarePlusApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/patients
        [HttpGet]
        public async Task<IActionResult> GetPatients()
        {
            try
            {
                var patients = await _context.Patients.ToListAsync();
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching patients", error = ex.Message });
            }
        }

        // GET: api/patients/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatient(int id)
        {
            try
            {
                var patient = await _context.Patients.FindAsync(id);
                if (patient == null)
                    return NotFound(new { message = "Patient not found" });

                return Ok(patient);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching patient", error = ex.Message });
            }
        }

        // POST: api/patients
        [HttpPost]
        public async Task<IActionResult> CreatePatient([FromBody] Patient patient)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Hash password before saving
                if (!string.IsNullOrEmpty(patient.Password))
                {
                    patient.Password = PasswordHelper.HashPassword(patient.Password);
                }

                _context.Patients.Add(patient);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, new
                {
                    patient.Id,
                    patient.FirstName,
                    patient.LastName,
                    patient.DateOfBirth,
                    patient.Age,
                    patient.Email,
                    patient.Gender,
                    patient.Address,
                    patient.Contact
                    // Do not return Password
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating patient", error = ex.Message });
            }
        }

        // PUT: api/patients/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] Patient patient)
        {
            try
            {
                var existingPatient = await _context.Patients.FindAsync(id);
                if (existingPatient == null)
                    return NotFound(new { message = "Patient not found" });

                existingPatient.FirstName = patient.FirstName;
                existingPatient.LastName = patient.LastName;
                existingPatient.DateOfBirth = patient.DateOfBirth;
                existingPatient.Age = patient.Age;
                existingPatient.Email = patient.Email;
                existingPatient.Contact = patient.Contact;
                existingPatient.Address = patient.Address;
                existingPatient.Gender = patient.Gender;

                // Update password if provided
                if (!string.IsNullOrEmpty(patient.Password))
                {
                    existingPatient.Password = PasswordHelper.HashPassword(patient.Password);
                }

                _context.Patients.Update(existingPatient);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    existingPatient.Id,
                    existingPatient.FirstName,
                    existingPatient.LastName,
                    existingPatient.DateOfBirth,
                    existingPatient.Age,
                    existingPatient.Email,
                    existingPatient.Gender,
                    existingPatient.Address,
                    existingPatient.Contact
                    // Do not return Password
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating patient", error = ex.Message });
            }
        }

        // DELETE: api/patients/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            try
            {
                var patient = await _context.Patients.FindAsync(id);
                if (patient == null)
                    return NotFound(new { message = "Patient not found" });

                _context.Patients.Remove(patient);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Patient deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting patient", error = ex.Message });
            }
        }
    }
}
