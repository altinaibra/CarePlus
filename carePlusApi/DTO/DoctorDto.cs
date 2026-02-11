using CarePlusApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace carePlusApi.DTO
{
    public class DoctorDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [JsonPropertyName("speciality")] // matches React form field
        public string Specialization { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string LicenseNumber { get; set; }

        [Required]
        public string Password { get; set; }
    }
}