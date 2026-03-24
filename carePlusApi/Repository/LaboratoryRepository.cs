using carePlusApi.Models;
using carePlusApi.DTO;
using Microsoft.EntityFrameworkCore;
using CarePlusApi.Data;

namespace carePlusApi.Repositories
{
    public interface ILaboratoryRepository
    {
        Task<LaboratoryDto?> GetByUserIdAsync(string userId);
        Task<LaboratoryDto> ToggleLabStatusAsync(string userId, bool status);
        Task<LaboratoryDto> CreateAsync(LaboratoryDto labDto);
        Task<List<LaboratoryDto>> GetAllAsync();
    }

    public class LaboratoryRepository : ILaboratoryRepository
    {
        private readonly AppDbContext _context;

        public LaboratoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<LaboratoryDto?> GetByUserIdAsync(string userId)
        {
            var lab = await _context.Laboratories.FirstOrDefaultAsync(l => l.UserId == userId);
            if (lab == null) return null;

            return MapToDto(lab);
        }

        public async Task<LaboratoryDto> ToggleLabStatusAsync(string userId, bool status)
        {
            var lab = await _context.Laboratories.FirstOrDefaultAsync(l => l.UserId == userId);

            if (lab == null)
            {
                lab = new Models.Laboratory
                {
                    UserId = userId,
                    Status = status
                };
                _context.Laboratories.Add(lab);
            }
            else
            {
                lab.Status = status;
                _context.Laboratories.Update(lab);
            }

            await _context.SaveChangesAsync();
            return MapToDto(lab);
        }

        public async Task<LaboratoryDto> CreateAsync(LaboratoryDto labDto)
        {
            var lab = new Models.Laboratory
            {
                Name = labDto.Name,
                Description = labDto.Description,
                Price = labDto.Price,
                Unit = labDto.Unit,
                Status = labDto.Status,
                UserId = labDto.UserId
            };

            _context.Laboratories.Add(lab);
            await _context.SaveChangesAsync();

            return MapToDto(lab);
        }

        public async Task<List<LaboratoryDto>> GetAllAsync()
        {
            return await _context.Laboratories
                .Select(l => MapToDto(l))
                .ToListAsync();
        }

        private LaboratoryDto MapToDto(Models.Laboratory lab)
        {
            return new LaboratoryDto
            {
                Id = lab.Id,
                Name = lab.Name,
                Description = lab.Description,
                Price = lab.Price,
                Unit = lab.Unit,
                Status = lab.Status,
                UserId = lab.UserId
            };
        }
    }
}