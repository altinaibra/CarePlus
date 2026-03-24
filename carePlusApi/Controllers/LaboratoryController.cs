using Microsoft.AspNetCore.Mvc;
using carePlusApi.DTO;
using carePlusApi.Repositories;

namespace carePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LaboratoryController : ControllerBase
    {
        private readonly ILaboratoryRepository _repository;

        public LaboratoryController(ILaboratoryRepository repository)
        {
            _repository = repository;
        }

        // GET: api/laboratory/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUser(string userId)
        {
            var lab = await _repository.GetByUserIdAsync(userId);
            if (lab == null) return NotFound();
            return Ok(lab);
        }

        // POST: api/laboratory/toggle
        [HttpPost("toggle")]
        public async Task<IActionResult> ToggleLab([FromBody] ToggleLabDto dto)
        {
            var lab = await _repository.ToggleLabStatusAsync(dto.UserId, dto.Status);
            return Ok(lab);
        }

        // POST: api/laboratory/create
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] LaboratoryDto dto)
        {
            var lab = await _repository.CreateAsync(dto);
            return Ok(lab);
        }

        // GET: api/laboratory/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var labs = await _repository.GetAllAsync();
            return Ok(labs);
        }
    }

    // DTO për toggle
    public class ToggleLabDto
    {
        public string UserId { get; set; } = string.Empty;
        public bool Status { get; set; }
    }
}