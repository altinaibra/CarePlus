using CarePlusApi.DTO;
using carePlusApi.Models;
using carePlusApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CarePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrenciesController : ControllerBase
    {
        private readonly ICurrencyRepository _currencyRepository;

        public CurrenciesController(ICurrencyRepository currencyRepository)
        {
            _currencyRepository = currencyRepository;
        }

        // GET: api/currencies
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var currencies = await _currencyRepository.GetAllCurrenciesAsync();
            return Ok(currencies);
        }

        // GET: api/currencies/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var currency = await _currencyRepository.GetCurrencyByIdAsync(id);
            if (currency == null) return NotFound();
            return Ok(currency);
        }

        // POST: api/currencies
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Currency currency)
        {
            if (currency == null) return BadRequest();

            var id = await _currencyRepository.CreateCurrencyAsync(currency);
            return CreatedAtAction(nameof(GetById), new { id }, currency);
        }

        // PUT: api/currencies/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Currency currency)
        {
            if (currency == null || id != currency.CurrencyId) return BadRequest();

            var updated = await _currencyRepository.UpdateCurrencyAsync(currency);
            if (!updated) return NotFound();

            return NoContent();
        }

        // DELETE: api/currencies/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _currencyRepository.DeleteCurrencyAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}