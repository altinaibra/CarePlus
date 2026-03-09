
using CarePlusApi.Data;
using Microsoft.EntityFrameworkCore;

namespace carePlusApi.Models
{
    public class PrinterRepository
    {
        private readonly AppDbContext _context;

        public PrinterRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Printer>> GetAllAsync() => await _context.Printers.ToListAsync();

        public async Task<Printer?> GetByIdAsync(int id) => await _context.Printers.FirstOrDefaultAsync(p => p.PrinterId == id);

        public async Task<Printer> AddAsync(Printer printer)
        {
            _context.Printers.Add(printer);
            await _context.SaveChangesAsync();
            return printer;
        }

        public async Task<Printer?> UpdateAsync(int id, Printer printer)
        {
            var existing = await _context.Printers.FindAsync(id);
            if (existing == null) return null;

            existing.PrinterName = printer.PrinterName;
            existing.PrinterDescription = printer.PrinterDescription;
            existing.DefaultPrinter = printer.DefaultPrinter;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var printer = await _context.Printers.FindAsync(id);
            if (printer == null) return false;

            _context.Printers.Remove(printer);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}