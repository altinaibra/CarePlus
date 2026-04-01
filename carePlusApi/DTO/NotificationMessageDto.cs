namespace carePlusApi.DTO
{
    public class NotificationMessageDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsGlobal { get; set; } = true;
        public bool IsActive { get; set; } = true;
    }
}
