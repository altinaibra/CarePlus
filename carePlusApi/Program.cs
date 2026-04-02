using CarePlusApi.Data;
using CarePlusApi.Services;
using CarePlusApi.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Net;
using System.Net.Sockets;
using System.Text;
using carePlusApi.Repository;
using carePlusApi.Models;
using carePlusApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<DepartmentRepository>();
builder.Services.AddScoped<DepartmentDetailsRepository>();
builder.Services.AddScoped<PrescriptionRepository>();
builder.Services.AddScoped<RoomRepository>();
builder.Services.AddScoped<carePlusApi.Repository.PrinterRepository>();
builder.Services.AddScoped<carePlusApi.Models.PrinterRepository>();
builder.Services.AddScoped<ILaboratoryRepository, LaboratoryRepository>();
builder.Services.AddScoped<ITypesOfAnalysesRepository, TypesOfAnalysesRepository>();
builder.Services.AddScoped<ICurrencyRepository, CurrencyRepository>();
builder.Services.AddScoped<PrinterGroupRepository>();
builder.Services.AddScoped<HospitalRepository>();

builder.Services.AddScoped<AuthService>();

builder.Services.AddControllers();

static bool IsAllowedFrontendOrigin(string? origin)
{
    if (string.IsNullOrWhiteSpace(origin))
    {
        return false;
    }

    if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
    {
        return false;
    }

    if (!string.Equals(uri.Scheme, "http", StringComparison.OrdinalIgnoreCase) &&
        !string.Equals(uri.Scheme, "https", StringComparison.OrdinalIgnoreCase))
    {
        return false;
    }

    if (string.Equals(uri.Host, "localhost", StringComparison.OrdinalIgnoreCase))
    {
        return true;
    }

    if (!IPAddress.TryParse(uri.Host, out var ip))
    {
        return false;
    }

    if (IPAddress.IsLoopback(ip))
    {
        return true;
    }

    if (ip.AddressFamily != AddressFamily.InterNetwork)
    {
        return false;
    }

    var bytes = ip.GetAddressBytes();
    var is10 = bytes[0] == 10;
    var is172 = bytes[0] == 172 && bytes[1] >= 16 && bytes[1] <= 31;
    var is192 = bytes[0] == 192 && bytes[1] == 168;

    return is10 || is172 || is192;
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.SetIsOriginAllowed(IsAllowedFrontendOrigin)
            .AllowAnyMethod()
            .AllowAnyHeader();
    });

});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CarePlus API", Version = "v1" });


    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer TOKEN')",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme{
                Reference = new OpenApiReference{
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            }, new string[]{ }
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CarePlus API v1");
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
