using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Bilhet.Repository.Migrations
{
    public partial class Adicionar_Usuario_Fidelidade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    CPF = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Login = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Fidelidade = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataHoraCriacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataHoraAlteracao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsuarioIdCriacao = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsuarioIdAlteracao = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => new { x.CPF, x.Email });
                });

            migrationBuilder.CreateTable(
                name: "Fidelidade",
                columns: table => new
                {
                    Email = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    CPF = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Pontos = table.Column<int>(type: "int", nullable: false),
                    BilheteId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BilheteSenha = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataHoraCriacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataHoraAlteracao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsuarioIdCriacao = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsuarioIdAlteracao = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fidelidade", x => x.Email);
                    table.ForeignKey(
                        name: "FK_Fidelidade_Bilhete_BilheteId_BilheteSenha",
                        columns: x => new { x.BilheteId, x.BilheteSenha },
                        principalTable: "Bilhete",
                        principalColumns: new[] { "Id", "Senha" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Fidelidade_Usuario_CPF_Email",
                        columns: x => new { x.CPF, x.Email },
                        principalTable: "Usuario",
                        principalColumns: new[] { "CPF", "Email" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Fidelidade_BilheteId_BilheteSenha",
                table: "Fidelidade",
                columns: new[] { "BilheteId", "BilheteSenha" });

            migrationBuilder.CreateIndex(
                name: "IX_Fidelidade_CPF_Email",
                table: "Fidelidade",
                columns: new[] { "CPF", "Email" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fidelidade");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
