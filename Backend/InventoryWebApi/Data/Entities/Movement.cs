using InventoryWebApi.Data.Enums;

namespace InventoryWebApi.Data.Entities
{
    public class Movement
    {
        // Primary key
        public int MovementId { get; set; }

        // Movement category mapping to MovementType enum (Entry or Exit)
        public MovementType MovementType { get; set; }

        // Operational movement date
        public DateOnly MovementDate { get; set; }

        // Optional observation or remarks
        public string Observation { get; set; }

        // Audit timestamp recording the actual system insertion date
        public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        // Virtual navigation property for related MovementDetail entities
        public IEnumerable<MovementDetail> MovementDetail { get; set; } = new List<MovementDetail>();
    }
}
