using InventoryWebApi.Business;
using InventoryWebApi.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace InventoryWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(ProductBusiness _service) : ControllerBase
    {
        // POST: api/product - Create a new product
        [HttpPost]
        public async Task<IActionResult> Create(CreateProductRequest req)
        {
            var result = await _service.CreateAsync(req);
            return Ok(result);
        }

        // GET: api/product?searchTerm=xyz - Retrieve all products with optional filter
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? searchTerm)
        {
            var result = await _service.GetAllAsync(searchTerm);
            return Ok(result);
        }
    }
}
