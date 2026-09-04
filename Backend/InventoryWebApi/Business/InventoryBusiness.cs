using InventoryWebApi.Data;
using InventoryWebApi.Data.Entities;
using InventoryWebApi.Data.Enums;
using InventoryWebApi.DTOs;
using Microsoft.EntityFrameworkCore;

namespace InventoryWebApi.Business
{
    public class InventoryBusiness(AppDbContext _db)
    {
        // Create a movement, update product stocks, and save details
        public async Task<ApiResponse<int>> CreateMovementAsync(CreateMovementRequest req)
        {
            // Validate that movement type is defined in the MovementType enum
            if (!Enum.IsDefined(typeof(MovementType), req.movementTypeValue))
                return ApiResponse<int>.Failure("Movement type is not allowed");

            // Validate that at least one product detail is provided
            if ( !req.details.Any())
                return ApiResponse<int>.Failure("Products are required");

            // Validate that all product IDs exist in the database
            var dbEntity = new Movement
            {
                MovementType = (MovementType)req.movementTypeValue,
                MovementDate = req.movementDate,
                Observation = req.observation,
                MovementDetail = req.details.Select(d => new MovementDetail
                {
                    ProductId = d.productId,
                    Quantity = d.quantity
                }).ToList()
            };

            // Update current stock for each product according to movement type
            foreach (var item in req.details)
            {
                var productFound = await _db.Products.FindAsync(item.productId);

                if (dbEntity.MovementType == MovementType.Entry)
                    // Increase stock on entry
                    productFound!.CurrentStock += item.quantity;
                else  // Decrease stock on exit
                    productFound!.CurrentStock -= item.quantity;
            }

            // Add movement entity to context and persist database changes
            await _db.Movements.AddAsync(dbEntity);
            await _db.SaveChangesAsync();

            // Return the ID of the newly created movement
            return ApiResponse<int>.Success(dbEntity.MovementId);
        }

        //  Retrieve paginated inventory data with status descriptions
        public async Task<ApiResponse<GetQueryInventoryResponse>> GetInventoryAsync(QueryInventoryRequest req)
        {
            // Base query for products without tracking to improve performance
            var query = _db.Products.AsNoTracking();

            // Count total items before pagination
            var totalItems = await query.CountAsync();

            // Apply pagination and order by creation date descending
            var products = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((req.page - 1) * req.pageSize)
                .Take(req.pageSize)
                .ToListAsync();

            // Map products to response DTOs with stock status
            var result = products.Select(p => new GetInventoryResponse(
                productCode: p.Code,
                productName: p.Name,
                minStock: p.MinStock,
                currentStock: p.CurrentStock,
                status: p.CurrentStock == 0 ? "Out of Stock" : (p.CurrentStock <= p.MinStock ? "Low Stock" : "With Stock")
                )).ToList();


            // Create response object with paginated data
            var response = new GetQueryInventoryResponse(
                result,
                req.page,
                req.pageSize,
                totalItems
            );

            return ApiResponse<GetQueryInventoryResponse>.Success(response);
        }

        // Generate 5-day movement history chart data (entries vs exits)
        public async Task<ApiResponse<List<GetMovementChartResponse>>> GetMovementsReportAsync()
        {
            // Calculate the start date for the 5-day range (4 days ago to today)
            var startDate = DateOnly.FromDateTime(DateTime.Today.AddDays(-4));

            // Query movement records for the specified date range
            var rawData = await _db.Movements
                .AsNoTracking()
                .Where(m => m.MovementDate >= startDate)
                .GroupBy(m => new { m.MovementDate, m.MovementType })
                .Select(g => new
                {
                    g.Key.MovementDate,
                    g.Key.MovementType,
                    Count = g.Count()
                })
                .ToListAsync();

            // Create a dictionary for quick lookup of counts by date and movement type
            var dictionary = rawData.ToDictionary(
                x => (x.MovementDate, x.MovementType),
                x => x.Count);

            // Generate the final result for the 5-day range, filling in missing data with 0
            var result = Enumerable.Range(0, 5)
                .Select(i =>
                {
                    var day = startDate.AddDays(i);

                    // Attempt to retrieve entries, default to 0 if not found
                    dictionary.TryGetValue((day, MovementType.Entry), out var entries);

                    // Attempt to retrieve exits, default to 0 if not found
                    dictionary.TryGetValue((day, MovementType.Exit), out var exits);

                    // Create a response object for the current day with entry and exit counts
                    return new GetMovementChartResponse(
                        Day: day.ToString("dd/MM"),
                        Entries: entries,
                        Exits: exits
                );
        }).ToList();

            return ApiResponse<List<GetMovementChartResponse>>.Success(result);
        }

        // Retrieve top 5 products currently below safety threshold
        public async Task<ApiResponse<List<GetProductReportResponse>>> GetProductReportAsync()
        {
            // Query products where stock is below minimum threshold
            var result = await _db.Products
                .AsNoTracking()
                .Where(p => p.CurrentStock < p.MinStock)
                .OrderBy(p => p.CurrentStock)
                .Take(5)
                .Select(p => new GetProductReportResponse(
                    name:p.Name,
                    quantity:p.CurrentStock
                ))
                .ToListAsync();

            return ApiResponse<List<GetProductReportResponse>>.Success(result);
        }
    }
}
