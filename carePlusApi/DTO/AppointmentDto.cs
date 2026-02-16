using System;
using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class AppointmentCreateDto
    {
        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        public string Reason { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
