using Bilhet.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bilhet.Repository.Configurations
{
    public class EventoConfigurations : IEntityTypeConfiguration<Evento>
    {
        public void Configure(EntityTypeBuilder<Evento> builder)
        {
            builder.ToTable("Evento");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Titulo).HasMaxLength(255).IsRequired();
            builder.Property(e => e.Preco).HasColumnType("decimal(18,2)").IsRequired();
            builder.Property(e => e.QtdIngresso).IsRequired();
            builder.Property(e => e.URLImage).HasMaxLength(255).IsRequired();
            builder.Property(e => e.Data).IsRequired();
            builder.Property(e => e.Endereco).HasMaxLength(255).IsRequired();
        }
    }
}
