using CarePlusApi.Data;
using CarePlusApi.Models;
using CarePlusApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using carePlusApi.DTO;

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
        public async Task<IActionResult> Login([FromBody] UserDto login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == login.Username || u.Email == login.Username);

            if (user != null && user.Password == ComputeSha256Hash(login.Password))
            {
                var token = _authService.GenerateJwtToken(user);
                return Ok(new { token, role = user.Role });
            }

            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Name == login.Username);
            if (doctor != null && doctor.Password == ComputeSha256Hash(login.Password))
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

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Email == login.Username);
            if (patient != null && patient.Password == ComputeSha256Hash(login.Password))
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
    }
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetUsers() => Ok(await _context.Users.ToListAsync());
    }

    [Authorize(Roles = "Admin,Doctor")]
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PatientsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetPatients() => Ok(await _context.Patients.ToListAsync());
    }

    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DoctorsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetDoctors() => Ok(await _context.Doctors.ToListAsync());
    }

    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DepartmentsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetDepartments() => Ok(await _context.Departments.ToListAsync());
    }

    [Authorize(Roles = "Admin,Doctor")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdmissionsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdmissionsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAdmissions() => Ok(await _context.Admissions.ToListAsync());
    }

    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BillingController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetBilling() => Ok(await _context.Billing.ToListAsync());
    }

    [Authorize(Roles = "Admin,Doctor")]
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalRecordsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MedicalRecordsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetMedicalRecords() => Ok(await _context.MedicalRecords
            .Include(m => m.Patient)
            .Include(m => m.Doctor)
            .ToListAsync());
    }
}
