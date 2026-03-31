namespace carePlusApi.Models
{
    public class Holiday
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
