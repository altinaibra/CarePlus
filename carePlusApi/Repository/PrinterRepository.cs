using carePlusApi.DTO;
using carePlusApi.Models;
using CarePlusApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Drawing.Printing;

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

        public async Task<bool> PrintLabReportAsync(LabReportPrintRequest request)
        {
            if (request?.SelectedLabs == null || !request.SelectedLabs.Any())
                return false;

            var defaultPrinter = await _context.Printers.FirstOrDefaultAsync(p => p.DefaultPrinter);
            if (defaultPrinter == null)
                return false;

            using var printDocument = new PrintDocument();
            printDocument.PrinterSettings.PrinterName = defaultPrinter.PrinterName;
            if (!printDocument.PrinterSettings.IsValid)
                return false;

            var selectedLabs = request.SelectedLabs;
            var currency = request.Currency ?? string.Empty;
            var title = string.IsNullOrWhiteSpace(request.Title) ? "Laboratory Report" : request.Title;

            printDocument.PrintPage += (sender, e) =>
            {
                var graphics = e.Graphics;
                var regularFont = new Font("Arial", 9, FontStyle.Regular);
                var boldFont = new Font("Arial", 10, FontStyle.Bold);
                float y = e.MarginBounds.Top;
                var lineHeight = regularFont.GetHeight(graphics) + 3;

                graphics.DrawString(title, boldFont, Brushes.Black, e.MarginBounds.Left, y);
                y += lineHeight * 2;

                graphics.DrawString($"Date: {DateTime.Now:dd.MM.yyyy HH:mm}", regularFont, Brushes.Black, e.MarginBounds.Left, y);
                y += lineHeight * 2;

                graphics.DrawString("Name", boldFont, Brushes.Black, e.MarginBounds.Left, y);
                graphics.DrawString("Price", boldFont, Brushes.Black, e.MarginBounds.Left + 220, y);
                graphics.DrawString("Unit", boldFont, Brushes.Black, e.MarginBounds.Left + 320, y);
                y += lineHeight;

                foreach (var lab in selectedLabs)
                {
                    if (y > e.MarginBounds.Bottom - lineHeight * 4)
                    {
                        e.HasMorePages = true;
                        return;
                    }

                    graphics.DrawString(lab.Name, regularFont, Brushes.Black, e.MarginBounds.Left, y);
                    graphics.DrawString($"{lab.Price:F2} {currency}", regularFont, Brushes.Black, e.MarginBounds.Left + 220, y);
                    graphics.DrawString(lab.Unit ?? string.Empty, regularFont, Brushes.Black, e.MarginBounds.Left + 320, y);
                    y += lineHeight;
                }

                y += lineHeight;
                graphics.DrawString($"Total: {request.TotalPrice:F2} {currency}", boldFont, Brushes.Black, e.MarginBounds.Left, y);
                e.HasMorePages = false;
            };

            printDocument.Print();
            return true;
        }

        public async Task<bool> PrintPrescriptionAsync(PrescriptionPrintRequest request)
        {
            if (request == null)
                return false;

            var defaultPrinter = await _context.Printers.FirstOrDefaultAsync(p => p.DefaultPrinter);
            if (defaultPrinter == null)
                return false;

            using var printDocument = new PrintDocument();
            printDocument.PrinterSettings.PrinterName = defaultPrinter.PrinterName;
            if (!printDocument.PrinterSettings.IsValid)
                return false;

            printDocument.DefaultPageSettings.PaperSize = new PaperSize("A4", 827, 1169);
            printDocument.DefaultPageSettings.Landscape = false;
            printDocument.DefaultPageSettings.Margins = new Margins(50, 50, 50, 50);

            printDocument.PrintPage += (sender, e) =>
            {
                var graphics = e.Graphics;
                var titleFont = new Font("Arial", 16, FontStyle.Bold);
                var sectionFont = new Font("Arial", 11, FontStyle.Bold);
                var bodyFont = new Font("Arial", 10, FontStyle.Regular);
                float y = e.MarginBounds.Top;
                var lineHeight = bodyFont.GetHeight(graphics) + 6;

                graphics.DrawString("PRESCRIPTION", titleFont, Brushes.Black, e.MarginBounds.Left, y);
                y += lineHeight * 2;

                graphics.DrawString($"Patient: {request.PatientName}", sectionFont, Brushes.Black, e.MarginBounds.Left, y);
                y += lineHeight;
                graphics.DrawString($"Age: {request.PatientAge}", bodyFont, Brushes.Black, e.MarginBounds.Left, y);
                graphics.DrawString($"Gender: {request.PatientGender}", bodyFont, Brushes.Black, e.MarginBounds.Left + 250, y);
                y += lineHeight;
                graphics.DrawString($"Date: {(string.IsNullOrWhiteSpace(request.PrintDate) ? DateTime.Now.ToString("dd.MM.yyyy") : request.PrintDate)}", bodyFont, Brushes.Black, e.MarginBounds.Left, y);
                y += lineHeight * 2;

                if (request.HasAllergies && !string.IsNullOrWhiteSpace(request.Allergies))
                {
                    graphics.DrawString("Allergies:", sectionFont, Brushes.Black, e.MarginBounds.Left, y);
                    y += lineHeight;
                    var allergyRect = new RectangleF(e.MarginBounds.Left, y, e.MarginBounds.Width, e.MarginBounds.Bottom - y);
                    graphics.DrawString(request.Allergies, bodyFont, Brushes.Black, allergyRect);
                    y += graphics.MeasureString(request.Allergies, bodyFont, e.MarginBounds.Width).Height + lineHeight;
                }

                graphics.DrawString("Diagnosis:", sectionFont, Brushes.Black, e.MarginBounds.Left, y);
                y += lineHeight;
                var diagnosisRect = new RectangleF(e.MarginBounds.Left, y, e.MarginBounds.Width, e.MarginBounds.Bottom - y);
                graphics.DrawString(request.Diagnosis, bodyFont, Brushes.Black, diagnosisRect);
                y += graphics.MeasureString(request.Diagnosis, bodyFont, e.MarginBounds.Width).Height + lineHeight;

                graphics.DrawString("Prescription:", sectionFont, Brushes.Black, e.MarginBounds.Left, y);
                y += lineHeight;
                var prescriptionRect = new RectangleF(e.MarginBounds.Left, y, e.MarginBounds.Width, e.MarginBounds.Bottom - y);
                graphics.DrawString(request.Prescription, bodyFont, Brushes.Black, prescriptionRect);
                y += graphics.MeasureString(request.Prescription, bodyFont, e.MarginBounds.Width).Height + lineHeight;

                if (!string.IsNullOrWhiteSpace(request.DoctorSignature))
                {
                    y += lineHeight;
                    graphics.DrawString("Doctor Signature:", sectionFont, Brushes.Black, e.MarginBounds.Left, y);
                    y += lineHeight;
                    graphics.DrawString(request.DoctorSignature, bodyFont, Brushes.Black, e.MarginBounds.Left, y);
                }

                e.HasMorePages = false;
            };

            printDocument.Print();
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