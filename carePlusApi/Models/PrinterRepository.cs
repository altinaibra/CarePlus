
using CarePlusApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;

namespace carePlusApi.Models
{
    public class PrinterRepository
    {
        private readonly AppDbContext _context;

        public PrinterRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Printer>> GetAllAsync()
        {
            var printers = await _context.Printers.ToListAsync();
            printers.ForEach(p => p.Online = CheckIfPrinterIsOnline(p.PrinterName));
            return printers;
        }

        public async Task<Printer?> GetByIdAsync(int id)
        {
            var printer = await _context.Printers.FirstOrDefaultAsync(p => p.PrinterId == id);
            if (printer == null) return null;

            printer.Online = CheckIfPrinterIsOnline(printer.PrinterName);
            return printer;
        }

        public async Task<Printer> AddAsync(Printer printer)
        {
            _context.Printers.Add(printer);
            await _context.SaveChangesAsync();
            printer.Online = CheckIfPrinterIsOnline(printer.PrinterName);
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
            existing.Online = CheckIfPrinterIsOnline(existing.PrinterName);
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

        private bool CheckIfPrinterIsOnline(string printerName)
        {
            try
            {
                foreach (string installedPrinter in PrinterSettings.InstalledPrinters)
                {
                    if (string.Equals(installedPrinter, printerName, StringComparison.OrdinalIgnoreCase))
                    {
                        return true;
                    }
                }
            }
            catch
            {
                // If the printer list cannot be read, treat the printer as offline.
            }

            return false;
        }
    }
}