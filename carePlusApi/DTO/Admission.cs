using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class Admission
    {
        public int Id { get; set; }

        [ForeignKey("Patient")]
        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public string RoomNumber { get; set; }

        [Required]
        public DateTime DateIn { get; set; }

        public DateTime? DateOut { get; set; }
    }
}