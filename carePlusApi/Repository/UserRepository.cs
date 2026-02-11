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

        public async Task<User?> GetByUsernameOrEmailAsync(string username, string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u =>
                    (username != null && u.Username == username) ||
                    (email != null && u.Email == email)
                );
        }
    }
}
