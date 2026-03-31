using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class LabReportItemDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        public string Unit { get; set; }
    }

    public class LabReportPrintRequest
    {
        public string Title { get; set; } = "Laboratory Report";
        public string Currency { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public List<LabReportItemDto> SelectedLabs { get; set; } = new List<LabReportItemDto>();
    }
}
