using CarePlusApi.Data;
using carePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IntegrationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IntegrationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.IntegrationSettings.OrderBy(x => x.Id).ToListAsync();

            if (list.Count == 0)
            {
                list = new List<IntegrationSettings>
                {
                    new IntegrationSettings { Name = "SMS API (Twilio/AlbSMS)" },
                    new IntegrationSettings { Name = "Email SMTP" },
                    new IntegrationSettings { Name = "Insurance API" },
                    new IntegrationSettings { Name = "Barcode API" }
                };

                _context.IntegrationSettings.AddRange(list);
                await _context.SaveChangesAsync();
            }

            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] IntegrationSettings integration)
        {
            if (integration == null || string.IsNullOrWhiteSpace(integration.Name))
            {
                return BadRequest("Name is required.");
            }

            _context.IntegrationSettings.Add(integration);
            await _context.SaveChangesAsync();
            return Ok(integration);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] IntegrationSettings model)
        {
            var current = await _context.IntegrationSettings.FindAsync(id);
            if (current == null) return NotFound();

            current.Name = model.Name;
            current.Enabled = model.Enabled;
            current.ApiKey = model.ApiKey;

            await _context.SaveChangesAsync();
            return Ok(current);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var current = await _context.IntegrationSettings.FindAsync(id);
            if (current == null) return NotFound();

            _context.IntegrationSettings.Remove(current);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
