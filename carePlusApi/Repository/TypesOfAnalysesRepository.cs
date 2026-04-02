using carePlusApi.Models;
using carePlusApi.DTO;
using Microsoft.EntityFrameworkCore;
using CarePlusApi.Data;
using CarePlusApi.Models;

namespace carePlusApi.Repositories
{
    public interface ITypesOfAnalysesRepository
    {
        Task<List<TypeOfAnalysesDto>> GetAllAsync();
        Task<TypeOfAnalysesDto?> GetByIdAsync(int id);
        Task<TypeOfAnalysesDto> CreateAsync(TypeOfAnalysesDto dto);
        Task<TypeOfAnalysesDto?> UpdateAsync(int id, TypeOfAnalysesDto dto);
        Task<bool> DeleteAsync(int id);
    }

    public class TypesOfAnalysesRepository : ITypesOfAnalysesRepository
    {
        private readonly AppDbContext _context;

        public TypesOfAnalysesRepository(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL
        public async Task<List<TypeOfAnalysesDto>> GetAllAsync()
        {
            return await _context.TypesofAnalyses
                .AsNoTracking()
                .Select(a => new TypeOfAnalysesDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Price = a.Price,
                    Unit = a.Unit,
                    Status = a.Status,
                    UserId = a.UserId
                })
                .ToListAsync();
        }

        // GET BY ID
        public async Task<TypeOfAnalysesDto?> GetByIdAsync(int id)
        {
            var entity = await _context.TypesofAnalyses
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);
            return entity == null ? null : MapToDto(entity);
        }

        // CREATE
        public async Task<TypeOfAnalysesDto> CreateAsync(TypeOfAnalysesDto dto)
        {
            var entity = new TypeOfAnalyses
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Unit = dto.Unit,
                Status = dto.Status,
                UserId = dto.UserId
            };

            _context.TypesofAnalyses.Add(entity);
            await _context.SaveChangesAsync();

            dto.Id = entity.Id;
            return dto;
        }
        // UPDATE
        public async Task<TypeOfAnalysesDto?> UpdateAsync(int id, TypeOfAnalysesDto dto)
        {
            var entity = await _context.TypesofAnalyses.FindAsync(id);
            if (entity == null) return null;

            entity.Name = dto.Name;
            entity.Description = dto.Description;
            entity.Price = dto.Price;
            entity.Unit = dto.Unit;
            entity.Status = dto.Status;
            entity.UserId = dto.UserId;

            await _context.SaveChangesAsync();
            return MapToDto(entity);
        }
        // DELETE
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.TypesofAnalyses.FindAsync(id);
            if (entity == null) return false;

            _context.TypesofAnalyses.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        // Map entity to DTO
        private static TypeOfAnalysesDto MapToDto(TypeOfAnalyses a) => new TypeOfAnalysesDto
        {
            Id = a.Id,
            Name = a.Name,
            Description = a.Description,
            Price = a.Price,
            Unit = a.Unit,
            Status = a.Status,
            UserId = a.UserId
        };
    }
}