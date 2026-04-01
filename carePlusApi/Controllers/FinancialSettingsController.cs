using CarePlusApi.Data;
using carePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FinancialSettingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FinancialSettingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var settings = await _context.FinancialSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new FinancialSettings();
                _context.FinancialSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return Ok(settings);
        }

        [HttpPut]
        public async Task<IActionResult> Save([FromBody] FinancialSettings model)
        {
            var settings = await _context.FinancialSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new FinancialSettings();
                _context.FinancialSettings.Add(settings);
            }

            settings.TaxRate = model.TaxRate;
            settings.CurrencyCode = model.CurrencyCode;
            settings.InvoicePrefix = model.InvoicePrefix;
            settings.NextInvoiceNumber = model.NextInvoiceNumber;

            await _context.SaveChangesAsync();
            return Ok(settings);
        }
    }
}
