
namespace CarePlusApi.DTO
{
    public class PrescriptionDto
    {
        public string PatientName { get; set; }
        public int PatientAge { get; set; }
        public string PatientGender { get; set; }
        public bool HasAllergies { get; set; }
        public string? Allergies { get; set; }
    }
}