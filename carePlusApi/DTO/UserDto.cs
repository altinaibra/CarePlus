using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class UserDto
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public object Username { get; set; }
    }
}
