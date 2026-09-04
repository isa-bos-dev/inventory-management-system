using InventoryWebApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace InventoryWebApi.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        // Table mapping definitions for EF Core migrations
        public DbSet<Product> Products { get; set; }
        public DbSet<Movement> Movements { get; set; }
        public DbSet<MovementDetail> MovementDetails { get; set; } 
     }
}
