namespace carePlusApi.DTO
{
    public class CurrencyDto
    {
        public int CurrencyId { get; set; }
        public string CurrencyCode { get; set; } = string.Empty;
        public string CurrencyName { get; set; } = string.Empty;
        public string CurrencySymbol { get; set; } = string.Empty;
        public decimal ExchangeRate { get; set; }
        public bool Status { get; set; }
        public bool IsMainCurrency { get; set; }
        public DateTime EntryDate { get; set; } = DateTime.Now;
    }
}
