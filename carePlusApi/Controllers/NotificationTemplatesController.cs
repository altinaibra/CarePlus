using CarePlusApi.Data;
using carePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationTemplatesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationTemplatesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var templates = await _context.NotificationTemplates
                .OrderBy(t => t.Id)
                .ToListAsync();

            return Ok(templates);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NotificationTemplate template)
        {
            if (template == null || string.IsNullOrWhiteSpace(template.Title) || string.IsNullOrWhiteSpace(template.Message))
            {
                return BadRequest("Title and message are required.");
            }

            _context.NotificationTemplates.Add(template);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = template.Id }, template);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] NotificationTemplate model)
        {
            var template = await _context.NotificationTemplates.FindAsync(id);
            if (template == null) return NotFound();

            template.Title = model.Title;
            template.Channel = model.Channel;
            template.Message = model.Message;
            template.IsActive = model.IsActive;

            await _context.SaveChangesAsync();
            return Ok(template);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var template = await _context.NotificationTemplates.FindAsync(id);
            if (template == null) return NotFound();

            _context.NotificationTemplates.Remove(template);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
