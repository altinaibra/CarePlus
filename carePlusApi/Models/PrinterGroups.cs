using System.ComponentModel.DataAnnotations;

namespace carePlusApi.Models
{
    public class PrinterGroups
    {
        [Key] // Primary key
        public int PrinterGroupId { get; set; }

        [Required]
        public string GroupDescription { get; set; }

        public int? PrinterId { get; set; } // nullable, sepse mund të jetë null

        [Required]
        public DateTime EntryDate { get; set; }
    }
}
