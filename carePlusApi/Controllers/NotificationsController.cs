using System.Security.Claims;
using CarePlusApi.Data;
using carePlusApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!HasRole("admin", "doctor", "nurse"))
            {
                return Forbid();
            }

            var notifications = await _context.NotificationMessages
                .Where(x => x.IsActive)
                .OrderByDescending(x => x.CreatedAt)
                .Take(200)
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNotificationDto dto)
        {
            if (!HasRole("admin"))
            {
                return Forbid();
            }

            if (dto == null || string.IsNullOrWhiteSpace(dto.Title))
            {
                return BadRequest("Notification title is required.");
            }

            var username = User.Identity?.Name ?? "admin";
            var notification = new NotificationMessage
            {
                Title = dto.Title.Trim(),
                CreatedBy = username,
                CreatedAt = DateTime.UtcNow,
                IsGlobal = true,
                IsActive = true
            };

            _context.NotificationMessages.Add(notification);
            _context.AuditLogs.Add(new AuditLog
            {
                Username = username,
                Action = "Created notification",
                Target = notification.Title,
                CreatedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return Ok(notification);
        }

        private bool HasRole(params string[] allowedRoles)
        {
            var role = User.FindFirstValue(ClaimTypes.Role)?.ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(role))
            {
                return false;
            }

            return allowedRoles.Contains(role);
        }
    }

    public class CreateNotificationDto
    {
        public string Title { get; set; } = string.Empty;
    }
}
