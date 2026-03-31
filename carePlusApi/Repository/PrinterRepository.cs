using carePlusApi.Models;
using CarePlusApi.Data;
using Microsoft.EntityFrameworkCore;

namespace carePlusApi.Repository
{
    public class PrinterRepository
    {
        private readonly AppDbContext _context;

        public PrinterRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PrinterDto>> GetAllAsync()
        {
            var printers = await _context.Printers.ToListAsync();

            return printers.Select(p => new PrinterDto
            {
                PrinterId = p.PrinterId,
                PrinterName = p.PrinterName,
                PrinterDescription = p.PrinterDescription,
                DefaultPrinter = p.DefaultPrinter,
                EntryDate = p.EntryDate,
                Online = CheckIfPrinterIsOnline(p)
            });
        }
        public async Task<PrinterDto?> GetByIdAsync(int id)
        {
            var printer = await _context.Printers.FindAsync(id);
            if (printer == null) return null;

            return new PrinterDto
            {
                PrinterId = printer.PrinterId,
                PrinterName = printer.PrinterName,
                PrinterDescription = printer.PrinterDescription,
                DefaultPrinter = printer.DefaultPrinter,
                EntryDate = printer.EntryDate,
                Online = CheckIfPrinterIsOnline(printer)
            };
        }

        // Shto printer të ri
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

        private bool CheckIfPrinterIsOnline(Printer printer)
        {
            return true; 
        }
    }

    public class PrinterDto
    {
        public int PrinterId { get; set; }
        public string PrinterName { get; set; }
        public string PrinterDescription { get; set; }
        public bool DefaultPrinter { get; set; }
        public DateTime EntryDate { get; set; }
        public bool Online { get; set; }
    }
}