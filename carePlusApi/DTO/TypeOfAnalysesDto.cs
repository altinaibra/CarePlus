using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class TypeOfAnalysesDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public string Unit { get; set; }

        public bool Status { get; set; }

        public string? UserId { get; set; }
    }
}
