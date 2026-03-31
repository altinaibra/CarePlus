namespace carePlusApi.DTO
{
    public class HolidayDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
