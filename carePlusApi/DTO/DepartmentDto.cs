using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class DepartmentDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }


    }
}
