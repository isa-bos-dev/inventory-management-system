using InventoryWebApi.Business;
using InventoryWebApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Retrieve connection string and register DbContext with SQL Server provider
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
// Use the connection string to configure the DbContext for SQL Server
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connection));

// Register business services for dependency injection
builder.Services.AddScoped<ProductBusiness>();
// Register inventory business service for dependency injection
builder.Services.AddScoped<InventoryBusiness>();

// Configure CORS policy for Angular client application
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", policy =>
    {
        // Target Angular local development origin
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();


// Configure the HTTP request pipeline.

// Enable CORS middleware using defined policy name before authorization
app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
