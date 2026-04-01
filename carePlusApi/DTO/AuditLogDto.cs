namespace carePlusApi.DTO
{
    public class AuditLogDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = "system";
        public string Action { get; set; } = string.Empty;
        public string Target { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
