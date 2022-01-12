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
            builder.HasKey(e => e.Id);
            builder.Property(e => e.CPF);
            builder.Property(e => e.Email);
            builder.Property(e => e.Pontos).IsRequired();

            //builder.HasOne(e => e.Usuario).WithMany(e => e.Fidelidades).HasForeignKey(e => new { e.CPF, e.Email });
        }
    }
}
