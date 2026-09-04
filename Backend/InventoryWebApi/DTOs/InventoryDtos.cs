using InventoryWebApi.Data.Enums;

namespace InventoryWebApi.DTOs
{
    #region Requests
    // Line item payload for an inventory movement
    public record CreateMovementDetailRequest(int productId,int quantity);

    // Query parameters for server-side paginated inventory listing
    public record QueryInventoryRequest(int page,int pageSize);
    #endregion

    #region Responses

    // Single inventory row representing current product stock status
    public record GetInventoryResponse(
        string productCode,
        string productName,
        int minStock,
        int currentStock,
        string status
    );

    // Paginated envelope for inventory listing
    public record GetQueryInventoryResponse(
        List<GetInventoryResponse> Items,
        int page,
        int pageSize,
        int totalItems
    );

    // Chart data payload representing daily movement totals
    public record GetMovementChartResponse(
        string Day,
        int Entries,
        int Exits
    );

    // Low stock summary report for dashboard warnings
    public record GetProductReportResponse(string name,int quantity);

    #endregion
}
