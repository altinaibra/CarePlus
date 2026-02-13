using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarePlusApi.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [ForeignKey("Patient")]
        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        [ForeignKey("Doctor")]
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        public string Reason { get; set; }

        [Required]
        public string Status { get; set; }
    }

}
