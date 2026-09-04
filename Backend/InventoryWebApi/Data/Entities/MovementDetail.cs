namespace InventoryWebApi.Data.Entities
{
    public class MovementDetail
    {
        // Primary key
        public int MovementDetailId { get; set; }

        // Foreign keys
        public int MovementId { get; set; }
        public int ProductId { get; set; }

        // Quantity moved in this specific operation
        public int Quantity { get; set; }

        // Virtual navigation properties for entity relationship matching
        public virtual Movement Movement { get; set; }
        public virtual Product Product { get; set; }
    }
}
