using carePlusApi.DTO;
using carePlusApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using PrinterRepo = carePlusApi.Repository.PrinterRepository;

namespace carePlusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // => /api/Printer
    public class PrinterController : ControllerBase
    {
        private readonly PrinterRepo _repository;

        public PrinterController(PrinterRepo repository)
        {
            _repository = repository;
        }

        // GET: /api/Printer
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var printers = await _repository.GetAllAsync();
            return Ok(printers);
        }

        // GET: /api/Printer/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var printer = await _repository.GetByIdAsync(id);
            if (printer == null) return NotFound();

            return Ok(printer);
        }

        // POST: /api/Printer
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Printer printer)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var created = await _repository.AddAsync(printer);
            return CreatedAtAction(nameof(GetById), new { id = created.PrinterId }, created);
        }

        // PUT: /api/Printer/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Printer printer)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updated = await _repository.UpdateAsync(id, printer);
            if (updated == null) return NotFound();

            return Ok(updated);
        }

        // POST: /api/Printer/PrintLabReport
        [HttpPost("PrintLabReport")]
        public async Task<IActionResult> PrintLabReport([FromBody] LabReportPrintRequest printRequest)
        {
            if (printRequest == null || printRequest.SelectedLabs == null || !printRequest.SelectedLabs.Any())
                return BadRequest("No lab items selected for printing.");

            var result = await _repository.PrintLabReportAsync(printRequest);
            if (!result) return BadRequest("Default printer not found or print failed.");

            return Ok();
        }

        // POST: /api/Printer/PrintPrescription
        [HttpPost("PrintPrescription")]
        public async Task<IActionResult> PrintPrescription([FromBody] PrescriptionPrintRequest printRequest)
        {
            if (printRequest == null || string.IsNullOrWhiteSpace(printRequest.PatientName))
                return BadRequest("No prescription data supplied for printing.");

            var result = await _repository.PrintPrescriptionAsync(printRequest);
            if (!result) return BadRequest("Default printer not found or print failed.");

            return Ok();
        }

        // DELETE: /api/Printer/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _repository.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}