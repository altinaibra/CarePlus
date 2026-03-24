namespace carePlusApi.Models
{
    public class Laboratory
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public string Unit { get; set; } = string.Empty;

        public bool Status { get; set; } = false;

        public string? UserId { get; set; }
    }
}