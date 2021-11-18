using Bilhet.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bilhet.Repository.Configurations
{
    public class FidelidadeConfigurations : IEntityTypeConfiguration<Fidelidade>
    {
        public void Configure(EntityTypeBuilder<Fidelidade> builder)
        {
            builder.ToTable("Fidelidade");
            builder.Property(e => e.Pontos).IsRequired();
        }
    }
}
