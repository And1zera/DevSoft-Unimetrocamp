using Bilhet.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bilhet.Repository.Configurations
{
    public class UsuarioConfigurations : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuario");
            builder.HasKey(e => new { e.CPF, e.Email });
            builder.Property(e => e.Nome).HasMaxLength(255).IsRequired();
            builder.Property(e => e.Login).HasMaxLength(255).IsRequired();
            builder.Property(e => e.Email).HasMaxLength(255).IsRequired();
            builder.Property(e => e.Senha).HasMaxLength(255).IsRequired();
            builder.Property(e => e.Fidelidade).IsRequired();
        }
    }
}
