using carePlusApi.DTO;
using carePlusApi.Models;
using CarePlusApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carePlusApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HolidaysController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HolidaysController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var holidays = await _context.Holidays.ToListAsync();
            var result = holidays.Select(h => new HolidayDto
            {
                Id = h.Id,
                Name = h.Name,
                Date = h.Date,
                Comment = h.Comment
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var holiday = await _context.Holidays.FindAsync(id);
            if (holiday == null) return NotFound();

            return Ok(new HolidayDto
            {
                Id = holiday.Id,
                Name = holiday.Name,
                Date = holiday.Date,
                Comment = holiday.Comment
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(HolidayDto dto)
        {
            var holiday = new Holiday
            {
                Name = dto.Name,
                Date = dto.Date,
                Comment = dto.Comment
            };

            await _context.Holidays.AddAsync(holiday);
            await _context.SaveChangesAsync();

            dto.Id = holiday.Id;
            return Ok(dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, HolidayDto dto)
        {
            var holiday = await _context.Holidays.FindAsync(id);
            if (holiday == null) return NotFound();

            holiday.Name = dto.Name;
            holiday.Date = dto.Date;
            holiday.Comment = dto.Comment;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var holiday = await _context.Holidays.FindAsync(id);
            if (holiday == null) return NotFound();

            _context.Holidays.Remove(holiday);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
