using carePlusApi.DTO.carePlusApi.DTO;
using carePlusApi.Repository;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly RoomRepository _repository;

    public RoomsController()
    {
        _repository = new RoomRepository();
    }

    [HttpGet]
    public ActionResult<IEnumerable<RoomDto>> GetAll()
    {
        return Ok(_repository.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<RoomDto> GetById(int id)
    {
        var room = _repository.GetById(id);

        if (room == null)
            return NotFound();

        return Ok(room);
    }

    [HttpPost]
    public ActionResult<RoomDto> Create(RoomDto room)
    {
        var created = _repository.Add(room);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, RoomDto room)
    {
        if (!_repository.Update(id, room))
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (!_repository.Delete(id))
            return NotFound();

        return NoContent();
    }
}
