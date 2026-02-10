using CarePlusApi.Data;
using CarePlusApi.Models;
using CarePlusApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using carePlusApi.DTO;
using Admission = CarePlusApi.Models.Admission;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AuthController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            var identifier = login?.Username?.Trim();
            if (string.IsNullOrWhiteSpace(identifier) || string.IsNullOrWhiteSpace(login?.Password))
            {
                return BadRequest("Username and password are required.");
            }

            // Check User
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Email == identifier || u.FirstName == identifier);

            if (user != null && PasswordMatches(login.Password, user.Password))
            {
                var token = _authService.GenerateJwtToken(user);
                return Ok(new { token, role = user.Role });
            }

            // Check Doctor
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Name == login.Username);
            if (doctor != null && PasswordMatches(login.Password, doctor.Password))
            {
                var mappedUser = new User
                {
                    Id = doctor.Id,
                    Username = doctor.Name,
                    Password = doctor.Password,
                    Role = "Doctor"
                };

                var token = _authService.GenerateJwtToken(mappedUser);
                return Ok(new { token, role = "Doctor" });
            }

            // Check Patient
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Email == login.Username);
            if (patient != null && PasswordMatches(login.Password, patient.Password))
            {
                var mappedUser = new User
                {
                    Id = patient.Id,
                    Username = patient.Email,
                    Password = patient.Password,
                    Role = "Patient"
                };

                var token = _authService.GenerateJwtToken(mappedUser);
                return Ok(new { token, role = "Patient" });
            }

            return Unauthorized();
        }

        private string ComputeSha256Hash(string rawData)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
            return Convert.ToBase64String(bytes);
        }

        private bool PasswordMatches(string inputPassword, string storedPassword)
        {
            if (string.IsNullOrEmpty(inputPassword) || string.IsNullOrEmpty(storedPassword))
            {
                return false;
            }

            return storedPassword == inputPassword ||
                   storedPassword == ComputeSha256Hash(inputPassword);
        }
    }

    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdminController(AppDbContext context) => _context = context;

        [HttpPost("add-patient")]
        public async Task<IActionResult> AddPatient([FromBody] PatientDto dto)
        {
            var patient = new Patient
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = ComputeSha256Hash(dto.Password),
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender,
                Address = dto.Address,
                Contact = dto.Contact
            };
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return Ok(patient);
        }
        [HttpPost("add-doctor")]
        public async Task<IActionResult> AddDoctor([FromBody] DoctorDto dto)
        {
            var doctor = new Doctor
            {
                Name = dto.Name,
                Password = ComputeSha256Hash(dto.Password),
                DepartmentId = dto.DepartmentId,
                Specialization = dto.Specialization
            };
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return Ok(doctor);
        }

        // Assign Room
        [HttpPost("assign-room")]
        public async Task<IActionResult> AssignRoom(int patientId, string roomNumber)
        {
            var admission = new Admission
            {
                PatientId = patientId,
                RoomNumber = roomNumber,
                DateIn = DateTime.Now
            };
            _context.Admissions.Add(admission);
            await _context.SaveChangesAsync();
            return Ok(admission);
        }

        // Get Available Rooms
        [HttpGet("available-rooms")]
        public async Task<IActionResult> GetAvailableRooms()
        {
            var allRooms = new List<string> { "101", "102", "103", "104", "105" };
            var occupiedRooms = await _context.Admissions
                .Where(a => a.DateOut == null)
                .Select(a => a.RoomNumber)
                .ToListAsync();
            var freeRooms = allRooms.Except(occupiedRooms);
            return Ok(freeRooms);
        }

        private string ComputeSha256Hash(string rawData)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
            return Convert.ToBase64String(bytes);
        }
    }

    // ================== Doctor Controller ==================
    [Authorize(Roles = "Doctor")]
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DoctorController(AppDbContext context) => _context = context;

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
            return int.Parse(userId ?? "0");
        }
    }
}
