using CarePlusApi.Data;
using CarePlusApi.Models;
using carePlusApi.DTO;
using Microsoft.EntityFrameworkCore;
using CarePlusApi.Helpers; 

namespace CarePlusApi.Repository
{
    public class DoctorRepository
    {
        private readonly AppDbContext _context;

        public DoctorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Doctor?> GetByIdAsync(int id)
        {
            return await _context.Doctors.FindAsync(id);
        }

        public async Task<List<Doctor>> GetAllAsync()
        {
            return await _context.Doctors.ToListAsync();
        }

        public async Task<Doctor> CreateAsync(DoctorDto doctorDto)
        {
            var doctor = new Doctor
            {
                FirstName = doctorDto.FirstName,
                LastName = doctorDto.LastName,
                Specialization = doctorDto.Specialization,
                Email = doctorDto.Email,
                Phone = doctorDto.Phone,
                LicenseNumber = doctorDto.LicenseNumber,
                Password = PasswordHelper.HashPassword(doctorDto.Password) 
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return false;

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
