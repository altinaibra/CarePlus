using System.ComponentModel.DataAnnotations;

namespace CarePlusApi.Models
{
    public class DepartmentDetail
    {
        public int Id { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        [MaxLength(500)]
        public string ShortDescription { get; set; } = string.Empty;
        [MaxLength(2000)]
        public string Services { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Location { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Hours { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Highlight1Label { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Highlight1Value { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Highlight2Label { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Highlight2Value { get; set; } = string.Empty;
    }
}

