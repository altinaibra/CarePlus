using CarePlusApi.Data;
using CarePlusApi.Models;
using Microsoft.EntityFrameworkCore;

namespace carePlusApi.Repository
{
    public class DepartmentDetailsRepository
    {
        private readonly AppDbContext _context;

        public DepartmentDetailsRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<DepartmentDetail>> GetAllAsync()
        {
            return await _context.DepartmentDetails.ToListAsync();
        }
        public async Task<DepartmentDetail?> GetByIdAsync(int id)
        {
            return await _context.DepartmentDetails.FindAsync(id);
        }
        public async Task<DepartmentDetail?> GetByDepartmentIdAsync(int departmentId)
        {
            return await _context.DepartmentDetails
                .FirstOrDefaultAsync(d => d.DepartmentId == departmentId);
        }
        public async Task<DepartmentDetail> AddAsync(DepartmentDetail detail)
        {
            _context.DepartmentDetails.Add(detail);
            await _context.SaveChangesAsync();
            return detail;
        }
        public async Task<bool> UpdateAsync(DepartmentDetail detail)
        {
            _context.DepartmentDetails.Update(detail);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.DepartmentDetails.FindAsync(id);
            if (existing == null) return false;

            _context.DepartmentDetails.Remove(existing);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

