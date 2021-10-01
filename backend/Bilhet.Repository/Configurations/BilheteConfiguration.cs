using Bilhet.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bilhet.Repository.Configurations
{
    public class BilheteConfiguration : IEntityTypeConfiguration<Bilhete>
    {
        public void Configure(EntityTypeBuilder<Bilhete> builder)
        {
            builder.ToTable("Bilhete");
            builder.HasKey(e => new { e.Id, e.Senha});
            builder.Property(e => e.RG).HasMaxLength(12).IsRequired();
            builder.Property(e => e.Preco).HasColumnType("decimal(18,2)").IsRequired();

            builder.HasOne(e => e.Evento).WithMany(e => e.Bilhetes).HasForeignKey(e => e.EventoId);
        }
    }
}
