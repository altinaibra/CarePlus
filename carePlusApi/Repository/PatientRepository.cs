using CarePlusApi.Data;
using CarePlusApi.Models;
using carePlusApi.DTO;
using Microsoft.EntityFrameworkCore;
using CarePlusApi.Helpers;

namespace CarePlusApi.Repository
{
    public class PatientRepository
    {
        private readonly AppDbContext _context;
        public PatientRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Patient?> GetByIdAsync(int id)
        {
            return await _context.Patients.FindAsync(id);
        }
        public async Task<List<Patient>> GetAllAsync()
        {
            return await _context.Patients.ToListAsync();
        }
        public async Task<Patient> CreateAsync(PatientDto dto)
        {
            var patient = new Patient
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth,
                Age = dto.Age,
                Email = dto.Email,
                Gender = dto.Gender,
                Address = dto.Address,
                Contact = dto.Contact,
                Password = string.IsNullOrEmpty(dto.Password)
                    ? null
                    : PasswordHelper.HashPassword(dto.Password)
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return patient;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null) return false;

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
