using carePlusApi.Models;
using carePlusApi.DTO;
using CarePlusApi.Data;
using Microsoft.EntityFrameworkCore;

namespace carePlusApi.Repositories
{
    public interface ICurrencyRepository
    {
        Task<int> CreateCurrencyAsync(Currency currency);
        Task<IEnumerable<Currency>> GetAllCurrenciesAsync();
        Task<Currency?> GetCurrencyByIdAsync(int currencyId);
        Task<bool> UpdateCurrencyAsync(Currency currency);
        Task<bool> DeleteCurrencyAsync(int currencyId);
    }
    public class CurrencyRepository : ICurrencyRepository
    {
        private readonly AppDbContext _context;

        public CurrencyRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateCurrencyAsync(Currency currency)
        {
            if (currency.ExchangeRate <= 0)
                throw new Exception("Exchange rate cannot be negative or 0");

            _context.Currencies.Add(currency);
            await _context.SaveChangesAsync();
            return currency.CurrencyId;
        }
        public async Task<IEnumerable<Currency>> GetAllCurrenciesAsync()
        {
            return await _context.Currencies.ToListAsync();
        }
        public async Task<Currency?> GetCurrencyByIdAsync(int currencyId)
        {
            return await _context.Currencies.FindAsync(currencyId);
        }
        public async Task<bool> UpdateCurrencyAsync(Currency currency)
        {
            if (currency.ExchangeRate <= 0)
                throw new Exception("Exchange rate cannot be negative or 0");

            _context.Currencies.Update(currency);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteCurrencyAsync(int currencyId)
        {
            var entity = await _context.Currencies.FindAsync(currencyId);
            if (entity == null) return false;
            _context.Currencies.Remove(entity);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
