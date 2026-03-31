using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace carePlusApi.Models
{
    public class Printer
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