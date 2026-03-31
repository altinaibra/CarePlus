
using carePlusApi.DTO;
using carePlusApi.Models;
using CarePlusApi.Data;
using Microsoft.EntityFrameworkCore;

namespace carePlusApi.Repositories
{
    public class HospitalRepository
    {
        private readonly AppDbContext _context;

        public HospitalRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Hospital>> GetAllAsync()
        {
            return await _context.Hospitals.ToListAsync();
        }

        public async Task<Hospital?> GetByIdAsync(int id)
        {
            return await _context.Hospitals.FindAsync(id);
        }

        public async Task<Hospital> CreateAsync(HospitalDto dto)
        {
            var hospital = new Hospital
            {
                Name = dto.Name,
                Address = dto.Address,
                City = dto.City,
                BusinessNumber = dto.BusinessNumber,
                Email = dto.Email,
                Phone = dto.Phone
            };

            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync();

            return hospital;
        }

        public async Task<Hospital?> UpdateAsync(int id, HospitalDto dto)
        {
            var hospital = await _context.Hospitals.FindAsync(id);
            if (hospital == null) return null;

            hospital.Name = dto.Name;
            hospital.Address = dto.Address;
            hospital.City = dto.City;
            hospital.BusinessNumber = dto.BusinessNumber;
            hospital.Email = dto.Email;
            hospital.Phone = dto.Phone;

            await _context.SaveChangesAsync();
            return hospital;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var hospital = await _context.Hospitals.FindAsync(id);
            if (hospital == null) return false;

            _context.Hospitals.Remove(hospital);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}