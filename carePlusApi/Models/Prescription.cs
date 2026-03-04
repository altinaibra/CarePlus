using System;
using System.ComponentModel.DataAnnotations;

namespace CarePlusApi.Models
{
    public class Prescription
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string PatientName { get; set; }

        public int PatientAge { get; set; }

        public string PatientGender { get; set; }

        public bool HasAllergies { get; set; }

        public string? Allergies { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}