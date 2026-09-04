using InventoryWebApi.Data;
using InventoryWebApi.Data.Entities;
using InventoryWebApi.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace InventoryWebApi.Business
{
    public class ProductBusiness(AppDbContext _db)
    {
        // Create product with field validations
        public async Task<ApiResponse<int>> CreateAsync(CreateProductRequest req)
        {
            // Validate required name
            if (string.IsNullOrEmpty(req.name)) return ApiResponse<int>.Failure("Name is required");

            // Validate unique code (case-insensitive)
            var codeExists = await _db.Products
                .AnyAsync(p => p.Code.ToLower() == req.code.ToLower());
            if (codeExists) return ApiResponse<int>.Failure("Product code already exists");

            // Validate unique name (case-insensitive)
            var nameExists = await _db.Products
                .AnyAsync(p => p.Name.ToLower() == req.name.ToLower());
            if (nameExists) return ApiResponse<int>.Failure("Product name already exists");

            // Map request DTO to database entity
            var dbEntity = new Product
            {
                Code = req.code.ToUpper(),
                Name = req.name,
                MinStock = req.minStock,
                CurrentStock = 0 // Initial stock is always zero upon creation
            };

            // Persist to database asynchronously
            await _db.Products.AddAsync(dbEntity);
            await _db.SaveChangesAsync();

            // Return generated primary key
            return ApiResponse<int>.Success(dbEntity.ProductId);
        }

        // Retrieve all products with optional text search filter
        public async Task<ApiResponse<List<GetProductResponse>>> GetAllAsync(string? searchTerm)
        {
            // Read-only query without change tracking overhead
            var query = _db.Products.AsNoTracking();

            // Apply filter if search term is provided
            if (!string.IsNullOrEmpty(searchTerm))
                query = query
                    .Where(p => string.Concat(p.Code, p.Name)
                    .ToLower()
                    .Contains(searchTerm.ToLower()));

            // Materialize query from database
            var products = await query.ToListAsync();

            // Project database entities to response DTOs
            var result = products.Select(p => new GetProductResponse(
                productId: p.ProductId,
                code: p.Code,
                name: p.Name,
                minStock: p.MinStock,
                currentStock: p.CurrentStock
            )).ToList();

            return ApiResponse<List<GetProductResponse>>.Success(result);
        }
    }
}
