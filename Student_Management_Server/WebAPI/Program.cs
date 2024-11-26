using Microsoft.EntityFrameworkCore;
using WebAPI.Dtos;
using WebAPI.Models;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

//cau hinh auto mapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddControllers();
//Kiem tra Jwt
//builder.Services.AddAuthentication(option =>
//{
//    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(option =>
//{
//    option.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = builder.Configuration["Jwt:Issuer"],
//        ValidAudience = builder.Configuration["Jwt:Audience"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
//    };
//});
//builder.Services.AddAuthorization();
//ket noi database
string connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"].ToString();
builder.Services.AddDbContext<DatabaseContext>(option => option.UseLazyLoadingProxies().UseSqlServer(connectionString));
builder.Services.AddScoped<StudentService, StudentServiceImpl>();
builder.Services.AddScoped<CourseService, CourseServiceImpl>();


var app = builder.Build();
app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );
//app.UseAuthentication();
//app.UseAuthorization();
//middleware
//app.UseMiddleware<BasicAuthMiddleware>();




app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}");

app.Run();
