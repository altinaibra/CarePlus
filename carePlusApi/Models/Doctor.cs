using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarePlusApi.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Password { get; set; }

        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public Department Department { get; set; }

        public string Specialization { get; set; }
        public string Email { get; set; }

        public string Phone { get; set; }

        public string LicenseNumber { get; set; }
    }
}
