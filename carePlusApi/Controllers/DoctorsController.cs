using CarePlusApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [Authorize(Roles = "Doctor")]
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            var doctorId = GetCurrentDoctorId();

            var patients = await _context.MedicalRecords
                .Include(m => m.Patient)
                .Where(m => m.DoctorId == doctorId)
                .Select(m => m.Patient)
                .Distinct()
                .ToListAsync();

            return Ok(patients);
        }

        [HttpGet("admissions")]
        public async Task<IActionResult> GetAdmissions()
        {
            var doctorId = GetCurrentDoctorId();

            var admissions = await _context.Admissions
                .Include(a => a.Patient)
                .Where(a => _context.MedicalRecords
                    .Any(m => m.PatientId == a.PatientId && m.DoctorId == doctorId))
                .ToListAsync();

            return Ok(admissions);
        }

        private int GetCurrentDoctorId()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            return int.TryParse(userId, out var doctorId) ? doctorId : 0;
        }
    }
}
