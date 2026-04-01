namespace carePlusApi.DTO
{
    public class IntegrationSettingsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Enabled { get; set; } = false;
        public string ApiKey { get; set; } = string.Empty;
    }
}
