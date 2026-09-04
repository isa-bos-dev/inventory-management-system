namespace InventoryWebApi.DTOs
{
    #region Requests
    // Request payload for creating a new inventory movement (entry or exit)
    public record CreateMovementRequest(
        int movementTypeValue,
        DateOnly movementDate,
        string observation,
        IEnumerable<CreateMovementDetailRequest> details
        );

    // Request payload for creating a single movement detail line
    public record CreateMovementDetailRequest(int productId, int quantity);

    // Request payload for querying inventory with pagination parameters
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
        List<GetInventoryResponse> items,
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
