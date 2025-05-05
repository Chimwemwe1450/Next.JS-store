using Microsoft.EntityFrameworkCore;
using UserOrderApi.Models;

namespace UserOrderApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }  // Orders table
        public DbSet<OrderItem> OrderItems { get; set; }  // OrderItems table
        public DbSet<Product> Products { get; set; }  // Products table
        public DbSet<User> Users { get; set; } // Users table

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the relationship between Order and OrderItem (one-to-many)
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Items)  // An order can have many items
                .WithOne(oi => oi.Order)  // An order item belongs to one order
                .HasForeignKey(oi => oi.OrderId)  // Foreign key in OrderItem to reference Order
                .OnDelete(DeleteBehavior.Cascade);  // Cascade delete when the order is deleted

            // Remove Product relationship for simplicity

            // Set primary key for OrderItem
            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => oi.Id);  // Ensure Id is the primary key

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Product 1", Price = 10.00M },
                new Product { Id = 2, Name = "Product 2", Price = 20.00M }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
