using CarePlusApi.Data;
using carePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuditLogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuditLogsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int take = 100)
        {
            var logs = await _context.AuditLogs
                .OrderByDescending(x => x.CreatedAt)
                .Take(take)
                .ToListAsync();

            return Ok(logs);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AuditLog log)
        {
            if (log == null || string.IsNullOrWhiteSpace(log.Action))
            {
                return BadRequest("Action is required.");
            }

            if (log.CreatedAt == default)
            {
                log.CreatedAt = DateTime.UtcNow;
            }

            _context.AuditLogs.Add(log);
            await _context.SaveChangesAsync();
            return Ok(log);
        }
    }
}
