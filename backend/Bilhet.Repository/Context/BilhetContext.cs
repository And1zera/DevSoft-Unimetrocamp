using Bilhet.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Reflection;

namespace Bilhet.Repository.Context
{
    public class BilhetContext : DbContext
    {

        public DbSet<Evento> Evento { get; set; }
        public DbSet<Bilhete> Bilhete { get; set; }


        public BilhetContext(DbContextOptions<BilhetContext> options) : base(options)
        {
            // General Timeout setup for 180 seconds.
            Database.SetCommandTimeout(180);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            var entities = modelBuilder.Model.GetEntityTypes();

            // PluralizingTableNameConvention
            foreach (var entity in entities)
            {
                entity.SetTableName(entity.DisplayName());
            }

            // Restrict deletes for foreign keys
            foreach (var relationship in entities.SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            base.OnModelCreating(modelBuilder);

        }

    }
}
