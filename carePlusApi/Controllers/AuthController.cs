using carePlusApi.DTO;
using CarePlusApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var result = await _authService.LoginAsync(loginDto);
                return Ok(new
                {
                    userId = result.userId,
                    profileId = result.profileId,
                    token = result.token,
                    role = result.role,
                    username = result.username
                });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _authService.GetUserByIdAsync(id);
                if (user == null)
                    return NotFound(new { message = "User not found" });

                return Ok(new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email,
                    role = user.Role
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching user", error = ex.Message });
            }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            try
            {
                await _authService.ChangePasswordAsync(dto);
                return Ok(new { message = "Password changed successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}