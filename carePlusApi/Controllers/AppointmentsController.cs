using CarePlusApi.Data;
using CarePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/appointments
        [HttpGet]
        public async Task<IActionResult> GetAppointments()
        {
            try
            {
                var appointments = await _context.Appointments.ToListAsync();
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching appointments", error = ex.Message });
            }
        }

        // GET: api/appointments/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointment(int id)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(id);
                if (appointment == null)
                    return NotFound(new { message = "Appointment not found" });

                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching appointment", error = ex.Message });
            }
        }

        // POST: api/appointments
        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] Appointment appointment)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating appointment", error = ex.Message });
            }
        }

        // PUT: api/appointments/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, [FromBody] Appointment appointment)
        {
            try
            {
                var existingAppointment = await _context.Appointments.FindAsync(id);
                if (existingAppointment == null)
                    return NotFound(new { message = "Appointment not found" });

                existingAppointment.PatientId = appointment.PatientId;
                existingAppointment.DoctorId = appointment.DoctorId;
                existingAppointment.AppointmentDate = appointment.AppointmentDate;
                existingAppointment.Reason = appointment.Reason;
                existingAppointment.Status = appointment.Status;

                _context.Appointments.Update(existingAppointment);
                await _context.SaveChangesAsync();

                return Ok(existingAppointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating appointment", error = ex.Message });
            }
        }

        // DELETE: api/appointments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(id);
                if (appointment == null)
                    return NotFound(new { message = "Appointment not found" });

                _context.Appointments.Remove(appointment);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Appointment deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting appointment", error = ex.Message });
            }
        }
    }
}
