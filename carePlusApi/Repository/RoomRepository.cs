using carePlusApi.Models;
using CarePlusApi.Data;
using Microsoft.EntityFrameworkCore;

namespace carePlusApi.Repository
{
    public class RoomRepository
    {
        private readonly AppDbContext _context;
        public RoomRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Room>> GetAllAsync()
        {
            return await _context.Rooms.ToListAsync();
        }
        public async Task<Room?> GetByIdAsync(int id)
        {
            return await _context.Rooms.FindAsync(id);
        }
        public async Task<List<Room>> GetByDepartmentAsync(int departmentId)
        {
            return await _context.Rooms
                .Where(r => r.DepartmentId == departmentId)
                .ToListAsync();
        }
        public async Task<Room> AddAsync(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }
        public async Task<bool> UpdateAsync(Room room)
        {
            _context.Rooms.Update(room);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null) return false;

            _context.Rooms.Remove(room);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
