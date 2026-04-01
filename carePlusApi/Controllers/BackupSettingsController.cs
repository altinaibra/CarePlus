using CarePlusApi.Data;
using carePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BackupSettingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BackupSettingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var settings = await _context.BackupSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new BackupSetting();
                _context.BackupSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return Ok(settings);
        }

        [HttpPut]
        public async Task<IActionResult> Save([FromBody] BackupSetting model)
        {
            var settings = await _context.BackupSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new BackupSetting();
                _context.BackupSettings.Add(settings);
            }

            settings.AutoBackupEnabled = model.AutoBackupEnabled;
            settings.BackupInterval = model.BackupInterval;

            await _context.SaveChangesAsync();
            return Ok(settings);
        }

        [HttpPost("manual")]
        public async Task<IActionResult> ManualBackup()
        {
            var settings = await _context.BackupSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new BackupSetting();
                _context.BackupSettings.Add(settings);
            }

            settings.LastBackupAt = DateTime.UtcNow;

            _context.AuditLogs.Add(new AuditLog
            {
                Username = "system",
                Action = "Manual backup",
                Target = "Database",
                CreatedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return Ok(settings);
        }
    }
}
