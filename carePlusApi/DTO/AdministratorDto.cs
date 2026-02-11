using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class AdministratorDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
