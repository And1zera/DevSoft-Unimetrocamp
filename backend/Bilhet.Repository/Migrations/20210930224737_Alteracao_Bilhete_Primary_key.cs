using Microsoft.EntityFrameworkCore.Migrations;

namespace Bilhet.Repository.Migrations
{
    public partial class Alteracao_Bilhete_Primary_key : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Bilhete",
                table: "Bilhete");

            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                table: "Bilhete",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(6)",
                oldMaxLength: 6);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bilhete",
                table: "Bilhete",
                columns: new[] { "Id", "Senha" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Bilhete",
                table: "Bilhete");

            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                table: "Bilhete",
                type: "nvarchar(6)",
                maxLength: 6,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bilhete",
                table: "Bilhete",
                column: "Id");
        }
    }
}
