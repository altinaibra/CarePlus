namespace carePlusApi.DTO
{
    public class FinancialSettingsDto
    {
        public int Id { get; set; }
        public decimal TaxRate { get; set; } = 18m;
        public string CurrencyCode { get; set; } = "EUR";
        public string InvoicePrefix { get; set; } = "INV";
        public int NextInvoiceNumber { get; set; } = 1001;
    }
}
