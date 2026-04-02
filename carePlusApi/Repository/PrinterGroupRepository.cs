
using carePlusApi.DTO;
using CarePlusApi.Data;
using carePlusApi.Models;

public class PrinterGroupRepository
{
    private readonly AppDbContext _context;
    public PrinterGroupRepository(AppDbContext context)
    {
        _context = context;
    }
    public IEnumerable<PrinterGroupsDto> GetAll() =>
        _context.PrinterGroups.Select(pg => new PrinterGroupsDto
        {
            PrinterGroupId = pg.PrinterGroupId,
            GroupDescription = pg.GroupDescription,
            PrinterId = pg.PrinterId,
            EntryDate = pg.EntryDate
        }).ToList();
    public PrinterGroupsDto? GetById(int id) =>
        _context.PrinterGroups
                .Where(pg => pg.PrinterGroupId == id)
                .Select(pg => new PrinterGroupsDto
                {
                    PrinterGroupId = pg.PrinterGroupId,
                    GroupDescription = pg.GroupDescription,
                    PrinterId = pg.PrinterId,
                    EntryDate = pg.EntryDate
                }).FirstOrDefault();
    public PrinterGroupsDto Create(PrinterGroupsDto dto)
    {
        var entity = new PrinterGroups
        {
            GroupDescription = dto.GroupDescription,
            PrinterId = dto.PrinterId,
            EntryDate = dto.EntryDate
        };
        _context.PrinterGroups.Add(entity);
        _context.SaveChanges();
        dto.PrinterGroupId = entity.PrinterGroupId;
        return dto;
    }
    public PrinterGroupsDto? Update(int id, PrinterGroupsDto dto)
    {
        var entity = _context.PrinterGroups.Find(id);
        if (entity == null) return null;
        entity.GroupDescription = dto.GroupDescription;
        entity.PrinterId = dto.PrinterId;
        entity.EntryDate = dto.EntryDate;
        _context.SaveChanges();
        return dto;
    }
    public bool Delete(int id)
    {
        var entity = _context.PrinterGroups.Find(id);
        if (entity == null) return false;
        _context.PrinterGroups.Remove(entity);
        _context.SaveChanges();
        return true;
    }
}