using System.Text;
using API.MiddleWare;
using Application.Activities;
using Application.Interfaces;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(
                        "http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            //services.AddControllers();
            services.AddMvc()
            .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Create>())
            .SetCompatibilityVersion(CompatibilityVersion.Latest);

            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                });

            services.AddScoped<IJwtGenerator, JwtGenerator>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                
            }
            else 
            {

            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}