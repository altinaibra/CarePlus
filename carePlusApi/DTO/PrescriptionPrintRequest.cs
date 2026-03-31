using System.ComponentModel.DataAnnotations;

namespace carePlusApi.DTO
{
    public class PrescriptionPrintRequest
    {
        [Required]
        public string PatientName { get; set; } = string.Empty;

        public int PatientAge { get; set; }

        [Required]
        public string PatientGender { get; set; } = string.Empty;

        public bool HasAllergies { get; set; }

        public string Allergies { get; set; } = string.Empty;

        public string Diagnosis { get; set; } = string.Empty;

        public string Prescription { get; set; } = string.Empty;

        public string DoctorSignature { get; set; } = string.Empty;

        public string PrintDate { get; set; } = string.Empty;
    }
}
