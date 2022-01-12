using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Bilhet.Repository.Migrations
{
    public partial class Adicionar_FidelidadeUsuario_Bilhete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Fidelidade",
                table: "Bilhete",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioCPF",
                table: "Bilhete",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UsuarioEmail",
                table: "Bilhete",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "UsuarioId",
                table: "Bilhete",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Bilhete_UsuarioCPF_UsuarioEmail",
                table: "Bilhete",
                columns: new[] { "UsuarioCPF", "UsuarioEmail" });

            migrationBuilder.AddForeignKey(
                name: "FK_Bilhete_Usuario_UsuarioCPF_UsuarioEmail",
                table: "Bilhete",
                columns: new[] { "UsuarioCPF", "UsuarioEmail" },
                principalTable: "Usuario",
                principalColumns: new[] { "CPF", "Email" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bilhete_Usuario_UsuarioCPF_UsuarioEmail",
                table: "Bilhete");

            migrationBuilder.DropIndex(
                name: "IX_Bilhete_UsuarioCPF_UsuarioEmail",
                table: "Bilhete");

            migrationBuilder.DropColumn(
                name: "Fidelidade",
                table: "Bilhete");

            migrationBuilder.DropColumn(
                name: "UsuarioCPF",
                table: "Bilhete");

            migrationBuilder.DropColumn(
                name: "UsuarioEmail",
                table: "Bilhete");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Bilhete");
        }
    }
}
