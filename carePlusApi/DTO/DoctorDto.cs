using CarePlusApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class DoctorDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [ForeignKey("Department")]

        public string Password { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }

        public string Specialization { get; set; }
        public string Email { get; set; }

        public string Phone { get; set; }

        public string LicenseNumber { get; set; }
    }
}
