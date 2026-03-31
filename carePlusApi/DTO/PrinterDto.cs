using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class PrinterDto
    {
        [Key]
        public int PrinterId { get; set; }

        [Required]
        public string PrinterName { get; set; }

        [Required]
        public string PrinterDescription { get; set; }

        public bool DefaultPrinter { get; set; } = false;

        [Required]
        public DateTime EntryDate { get; set; }

        public bool Online { get; set; } = false;
    }
}
