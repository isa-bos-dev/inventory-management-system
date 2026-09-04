using InventoryWebApi.Business;
using InventoryWebApi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController(InventoryBusiness _service) : ControllerBase
    {
        // POST: api/inventory - Create a new stock movement
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovementRequest request)
        {
            var result = await _service.CreateMovementAsync(request);
            return Ok(result);
        }

        // GET: api/inventory - Retrieve paginated inventory stock list
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryInventoryRequest request)
        {
            var result = await _service.GetInventoryAsync(request);
            return Ok(result);
        }

        // GET: api/inventory/movement-report - Retrieve last 5 days movement chart data
        [HttpGet]
        [Route("GetMovementReport")]
        public async Task<IActionResult> GetMovementReport()
        {
            var result = await _service.GetMovementsReportAsync();
            return Ok(result);
        }

        // GET: api/inventory/low-stock-report - Retrieve products below minimum safety threshold
        [HttpGet]
        [Route("GetProductReport")]
        public async Task<IActionResult> GetProductReport()
        {
            var result = await _service.GetProductReportAsync();
            return Ok(result);
        }
    }
}
