namespace InventoryWebApi.Data.Entities
{
    public class Product
    {
        // Primary key
        public int ProductId { get; set; }

        // Product code and name identifiers
        public string Code { get; set; }
        public string Name { get; set; }

        // Minimum safety threshold and current on-hand quantity
        public int MinStock { get; set; }
        public int CurrentStock { get; set; }

        // Creation audit timestamp populated automatically by default
        public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
