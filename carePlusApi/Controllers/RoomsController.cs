using carePlusApi.DTO;
using carePlusApi.Models;
using carePlusApi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace carePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly RoomRepository _repository;

        public RoomsController(RoomRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetAll()
        {
            var rooms = await _repository.GetAllAsync();
            return Ok(rooms.Select(ToDto));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDto>> GetById(int id)
        {
            var room = await _repository.GetByIdAsync(id);
            if (room == null) return NotFound();

            return Ok(ToDto(room));
        }

        [HttpGet("department/{departmentId}")]
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetByDepartment(int departmentId)
        {
            var rooms = await _repository.GetByDepartmentAsync(departmentId);
            return Ok(rooms.Select(ToDto));
        }

        [HttpPost]
        public async Task<ActionResult<RoomDto>> Create(RoomDto dto)
        {
            var room = FromDto(dto);
            var created = await _repository.AddAsync(room);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, ToDto(created));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, RoomDto dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.RoomNumber = dto.RoomNumber;
            existing.DepartmentId = dto.DepartmentId;
            existing.TotalBeds = dto.TotalBeds;
            existing.AvailableBeds = dto.AvailableBeds;
            existing.OccupiedBeds = dto.OccupiedBeds;

            await _repository.UpdateAsync(existing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _repository.DeleteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }

        private static RoomDto ToDto(Room room) =>
            new()
            {
                Id = room.Id,
                RoomNumber = room.RoomNumber,
                DepartmentId = room.DepartmentId,
                TotalBeds = room.TotalBeds,
                AvailableBeds = room.AvailableBeds,
                OccupiedBeds = room.OccupiedBeds
            };

        private static Room FromDto(RoomDto dto) =>
            new()
            {
                Id = dto.Id,
                RoomNumber = dto.RoomNumber,
                DepartmentId = dto.DepartmentId,
                TotalBeds = dto.TotalBeds,
                AvailableBeds = dto.AvailableBeds,
                OccupiedBeds = dto.OccupiedBeds
            };
    }
}
