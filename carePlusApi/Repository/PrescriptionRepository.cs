using CarePlusApi.Data;
using CarePlusApi.Models;
using CarePlusApi.DTO;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Repository
{
    public class PrescriptionRepository
    {
        private readonly AppDbContext _context;
        public PrescriptionRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Prescription?> GetByIdAsync(int id)
        {
            return await _context.Prescriptions.FindAsync(id);
        }
        public async Task<List<Prescription>> GetAllAsync()
        {
            return await _context.Prescriptions
                                 .OrderByDescending(p => p.CreatedAt)
                                 .ToListAsync();
        }
        public async Task<Prescription> CreateAsync(PrescriptionDto prescriptionDto)
        {
            var prescription = new Prescription
            {
                PatientName = prescriptionDto.PatientName,
                PatientAge = prescriptionDto.PatientAge,
                PatientGender = prescriptionDto.PatientGender,
                HasAllergies = prescriptionDto.HasAllergies,
                Allergies = prescriptionDto.Allergies,
                CreatedAt = DateTime.UtcNow
            };

            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();

            return prescription;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var prescription = await _context.Prescriptions.FindAsync(id);
            if (prescription == null) return false;

            _context.Prescriptions.Remove(prescription);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}