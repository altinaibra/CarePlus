namespace carePlusApi.Models
{
    public class BackupSetting
    {
        public int Id { get; set; }
        public bool AutoBackupEnabled { get; set; } = true;
        public string BackupInterval { get; set; } = "daily";
        public DateTime? LastBackupAt { get; set; }
    }
}
