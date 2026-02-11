using CarePlusApi.Data;
using CarePlusApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Repository
{
    public class UserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }


    }
}
