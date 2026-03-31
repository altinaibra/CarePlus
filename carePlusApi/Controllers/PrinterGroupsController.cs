using Microsoft.AspNetCore.Mvc;
using carePlusApi.DTO;
using carePlusApi.Repository;

[Route("api/[controller]")]
[ApiController]
public class PrinterGroupsController : ControllerBase
{
    private readonly PrinterGroupRepository _repo;

    public PrinterGroupsController(PrinterGroupRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var groups = _repo.GetAll();
        return Ok(groups);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var group = _repo.GetById(id);
        if (group == null) return NotFound();
        return Ok(group);
    }

    [HttpPost]
    public IActionResult Create([FromBody] PrinterGroupsDto dto)
    {
        var group = _repo.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = group.PrinterGroupId }, group);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] PrinterGroupsDto dto)
    {
        var updated = _repo.Update(id, dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deleted = _repo.Delete(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}