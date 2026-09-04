namespace InventoryWebApi.DTOs
{
    #region requests
    // Request contract for product creation
    public record CreateProductRequest(
        string code,
        string name,
        int minStock
    );
    #endregion

    #region responses
    // Response contract for returning product details
    public record GetProductResponse(
        int productId,
        string code,
        string name,
        int minStock,
        int currentStock
    );
    #endregion
}
