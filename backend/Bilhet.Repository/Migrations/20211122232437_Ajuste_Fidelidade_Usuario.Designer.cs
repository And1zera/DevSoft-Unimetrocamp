﻿// <auto-generated />
using System;
using Bilhet.Repository.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Bilhet.Repository.Migrations
{
    [DbContext(typeof(BilhetContext))]
    [Migration("20211122232437_Ajuste_Fidelidade_Usuario")]
    partial class Ajuste_Fidelidade_Usuario
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Bilhet.Domain.Entities.Bilhete", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Senha")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DataHoraAlteracao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataHoraCriacao")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("EventoId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Fidelidade")
                        .HasColumnType("bit");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("RG")
                        .IsRequired()
                        .HasMaxLength(12)
                        .HasColumnType("nvarchar(12)");

                    b.Property<string>("UsuarioCPF")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UsuarioEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid>("UsuarioId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UsuarioIdAlteracao")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsuarioIdCriacao")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id", "Senha");

                    b.HasIndex("EventoId");

                    b.HasIndex("UsuarioCPF", "UsuarioEmail");

                    b.ToTable("Bilhete");
                });

            modelBuilder.Entity("Bilhet.Domain.Entities.Evento", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DataHoraAlteracao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataHoraCriacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("QtdIngresso")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("URLImage")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid?>("UsuarioIdAlteracao")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsuarioIdCriacao")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("Evento");
                });

            modelBuilder.Entity("Bilhet.Domain.Entities.Fidelidade", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<Guid?>("BilheteId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BilheteSenha")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CPF")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataHoraAlteracao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataHoraCriacao")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Pontos")
                        .HasColumnType("int");

                    b.Property<string>("UsuarioCPF")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UsuarioEmail")
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid?>("UsuarioIdAlteracao")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsuarioIdCriacao")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Email");

                    b.HasIndex("BilheteId", "BilheteSenha");

                    b.HasIndex("UsuarioCPF", "UsuarioEmail");

                    b.ToTable("Fidelidade");
                });

            modelBuilder.Entity("Bilhet.Domain.Entities.Usuario", b =>
                {
                    b.Property<string>("CPF")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Email")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("DataHoraAlteracao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataHoraCriacao")
                        .HasColumnType("datetime2");

                    b.Property<int>("Fidelidade")
                        .HasColumnType("int");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid?>("UsuarioIdAlteracao")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsuarioIdCriacao")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("CPF", "Email");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("Bilhet.Domain.Entities.Bilhete", b =>
                {
                    b.HasOne("Bilhet.Domain.Entities.Evento", "Evento")
                        .WithMany("Bilhetes")
                        .HasForeignKey("EventoId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Bilhet.Domain.Entities.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioCPF", "UsuarioEmail")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Evento");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Bilhet.Domain.Entities.Fidelidade", b =>
                {
                    b.HasOne("Bilhet.Domain.Entities.Bilhete", "Bilhete")
                        .WithMany()
                        .HasForeignKey("BilheteId", "BilheteSenha")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Bilhet.Domain.Entities.Usuario", "Usuario")
                        .WithMany("Fidelidades")
                        .HasForeignKey("UsuarioCPF", "UsuarioEmail")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Bilhete");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Bilhet.Domain.Entities.Evento", b =>
                {
                    b.Navigation("Bilhetes");
                });

            modelBuilder.Entity("Bilhet.Domain.Entities.Usuario", b =>
                {
                    b.Navigation("Fidelidades");
                });
#pragma warning restore 612, 618
        }
    }
}
