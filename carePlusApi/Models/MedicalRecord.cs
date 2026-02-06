using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CarePlusApi.Models;

public class MedicalRecord
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public Patient Patient { get; set; }
    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } // Added this property to fix the error
    public string Diagnosis { get; set; }
    public string Treatment { get; set; }
    public string Notes { get; set; }
}
