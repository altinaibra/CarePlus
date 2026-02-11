using carePlusApi.DTO;
using CarePlusApi.Models;
using CarePlusApi.Repository;
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

        public AuthService(IConfiguration config, UserRepository userRepository)
        {
            _config = config;
            _userRepository = userRepository;
        }

        public async Task<(string token, string role, string username)> LoginAsync(LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.Username))
                throw new Exception("Username must be provided.");

            var user = await _userRepository.GetByUsernameAsync(loginDto.Username);

            if (user == null)
                throw new Exception("User not found.");

            if (user.Password != loginDto.Password)
                throw new Exception("Invalid password.");

            var token = GenerateJwtToken(user);

            return (token, user.Role, user.Username);
        }


        public string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
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
    }
}
