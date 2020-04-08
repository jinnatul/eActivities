using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Value>()
            .HasData(
                new Value {Id = 1, Name = "Jinnat Morol"},
                new Value {Id = 2, Name = "Farhana"}
            );

            builder.Entity<UserActivity>()
                .HasKey(x => new {
                    x.ActivityId,
                    x.AppUserId
                });

            builder.Entity<UserActivity>()
                .HasOne(user => user.AppUser)
                .WithMany(activity => activity.UserActivities)
                .HasForeignKey(user => user.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(activity => activity.Activity)
                .WithMany(user => user.UserActivities)
                .HasForeignKey(activity => activity.ActivityId);
        }
    }
}
