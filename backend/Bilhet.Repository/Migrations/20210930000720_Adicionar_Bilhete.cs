using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Bilhet.Repository.Migrations
{
    public partial class Adicionar_Bilhete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bilhete",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RG = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    Preco = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    DataHoraCriacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataHoraAlteracao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsuarioIdCriacao = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsuarioIdAlteracao = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bilhete", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bilhete_Evento_EventoId",
                        column: x => x.EventoId,
                        principalTable: "Evento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bilhete_EventoId",
                table: "Bilhete",
                column: "EventoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bilhete");
        }
    }
}
