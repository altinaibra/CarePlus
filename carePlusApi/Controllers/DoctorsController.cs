using CarePlusApi.Data;
using CarePlusApi.Models;
using carePlusApi.DTO;
using CarePlusApi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/doctors")] 
    public class DoctorController : ControllerBase
    {
        private readonly DoctorRepository _doctorRepo;

        public DoctorController(AppDbContext context)
        {
            _doctorRepo = new DoctorRepository(context);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _doctorRepo.GetAllAsync();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(int id)
        {
            var doctor = await _doctorRepo.GetByIdAsync(id);
            if (doctor == null) return NotFound();
            return Ok(doctor);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDoctor([FromBody] DoctorDto doctorDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var doctor = await _doctorRepo.CreateAsync(doctorDto);

            return Ok(new
            {
                doctor.Id,
                doctor.FirstName,
                doctor.LastName,
                doctor.Specialization,
                doctor.Email,
                doctor.Phone,
                doctor.LicenseNumber
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var deleted = await _doctorRepo.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
