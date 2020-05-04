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

        public DbSet<Photo> Photos { get; set; }
        
        public DbSet<Comment> Comments { get; set; }
        
        public DbSet<UserFollowing> Followings { get; set; }

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

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new {k.ObserverId, k.TargetId});

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

        }
    }
}
