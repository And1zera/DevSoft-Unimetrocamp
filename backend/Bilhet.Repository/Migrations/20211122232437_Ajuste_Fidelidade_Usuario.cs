using Microsoft.EntityFrameworkCore.Migrations;

namespace Bilhet.Repository.Migrations
{
    public partial class Ajuste_Fidelidade_Usuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fidelidade_Usuario_CPF_Email",
                table: "Fidelidade");

            migrationBuilder.DropIndex(
                name: "IX_Fidelidade_CPF_Email",
                table: "Fidelidade");

            migrationBuilder.AlterColumn<string>(
                name: "CPF",
                table: "Fidelidade",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Fidelidade",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)");

            migrationBuilder.AddColumn<string>(
                name: "UsuarioCPF",
                table: "Fidelidade",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioEmail",
                table: "Fidelidade",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fidelidade_UsuarioCPF_UsuarioEmail",
                table: "Fidelidade",
                columns: new[] { "UsuarioCPF", "UsuarioEmail" });

            migrationBuilder.AddForeignKey(
                name: "FK_Fidelidade_Usuario_UsuarioCPF_UsuarioEmail",
                table: "Fidelidade",
                columns: new[] { "UsuarioCPF", "UsuarioEmail" },
                principalTable: "Usuario",
                principalColumns: new[] { "CPF", "Email" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fidelidade_Usuario_UsuarioCPF_UsuarioEmail",
                table: "Fidelidade");

            migrationBuilder.DropIndex(
                name: "IX_Fidelidade_UsuarioCPF_UsuarioEmail",
                table: "Fidelidade");

            migrationBuilder.DropColumn(
                name: "UsuarioCPF",
                table: "Fidelidade");

            migrationBuilder.DropColumn(
                name: "UsuarioEmail",
                table: "Fidelidade");

            migrationBuilder.AlterColumn<string>(
                name: "CPF",
                table: "Fidelidade",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Fidelidade",
                type: "nvarchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Fidelidade_CPF_Email",
                table: "Fidelidade",
                columns: new[] { "CPF", "Email" });

            migrationBuilder.AddForeignKey(
                name: "FK_Fidelidade_Usuario_CPF_Email",
                table: "Fidelidade",
                columns: new[] { "CPF", "Email" },
                principalTable: "Usuario",
                principalColumns: new[] { "CPF", "Email" },
                onDelete: ReferentialAction.Restrict);
        }
    }
}
