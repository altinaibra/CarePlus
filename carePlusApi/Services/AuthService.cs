using carePlusApi.DTO;
using CarePlusApi.Data;
using CarePlusApi.Models;
using CarePlusApi.Helpers;
using CarePlusApi.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarePlusApi.Services
{
    public class AuthService
    {
        private readonly IConfiguration _config;
        private readonly UserRepository _userRepository;
        private readonly AppDbContext _context;

        public AuthService(IConfiguration config, UserRepository userRepository, AppDbContext context)
        {
            _config = config;
            _userRepository = userRepository;
            _context = context;
        }

        public async Task<(int id, string token, string role, string username)> LoginAsync(LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.Username))
                throw new Exception("Username must be provided.");

            var user = await _userRepository.GetByUsernameAsync(loginDto.Username);
            if (user == null)
                throw new Exception("User not found.");

            var hashedPassword = PasswordHelper.HashPassword(loginDto.Password);
            if (user.Password != hashedPassword && user.Password != loginDto.Password)
                throw new Exception("Invalid password.");

            int profileId = user.Id;

            var normalizedEmail = user.Email?.ToLowerInvariant();
            var normalizedUsername = user.Username?.ToLowerInvariant();

            if (string.Equals(user.Role, "patient", StringComparison.OrdinalIgnoreCase))
            {
                var patient = await _context.Patients
                    .FirstOrDefaultAsync(p => p.Email != null && p.Email.ToLower() == normalizedEmail);
                if (patient != null) profileId = patient.Id;
            }
            else if (string.Equals(user.Role, "doctor", StringComparison.OrdinalIgnoreCase))
            {
                var doctor = await _context.Doctors
                    .FirstOrDefaultAsync(d => d.Email != null && d.Email.ToLower() == normalizedEmail);
                if (doctor != null) profileId = doctor.Id;
            }
            else if (string.Equals(user.Role, "admin", StringComparison.OrdinalIgnoreCase) || string.Equals(user.Role, "administrator", StringComparison.OrdinalIgnoreCase))
            {
                var admin = await _context.Administrators
                    .FirstOrDefaultAsync(a => (a.Email != null && a.Email.ToLower() == normalizedEmail) || (a.Name != null && a.Name.ToLower() == normalizedUsername));
                if (admin != null) profileId = admin.Id;
            }

            var normalizedRole = NormalizeRole(user.Role);
            var token = GenerateJwtToken(user);
            return (profileId, token, normalizedRole, user.Username);
        }

        public async Task ChangePasswordAsync(ChangePasswordDto dto)
        {
            if (string.IsNullOrEmpty(dto.Username))
                throw new Exception("Username must be provided.");

            var user = await _userRepository.GetByUsernameAsync(dto.Username);
            if (user == null)
                throw new Exception("User not found.");

            var hashedCurrentPassword = PasswordHelper.HashPassword(dto.CurrentPassword);
            if (user.Password != hashedCurrentPassword && user.Password != dto.CurrentPassword)
                throw new Exception("Current password is incorrect.");

            user.Password = PasswordHelper.HashPassword(dto.NewPassword);
            await _userRepository.UpdateAsync(user);
        }
         
        public string GenerateJwtToken(User user)
        {
            var role = NormalizeRole(user.Role);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string NormalizeRole(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
                return string.Empty;

            return role.Equals("administrator", StringComparison.OrdinalIgnoreCase)
                ? "admin"
                : role.ToLowerInvariant();
        }
    }
}