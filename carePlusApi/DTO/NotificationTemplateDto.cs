namespace carePlusApi.DTO
{
    public class NotificationTemplateDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Channel { get; set; } = "Email";
        public string Message { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}
