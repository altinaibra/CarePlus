using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace carePlusApi.DTO
{
    public class PrinterGroupsDto
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