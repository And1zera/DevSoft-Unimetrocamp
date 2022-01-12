using Microsoft.EntityFrameworkCore.Migrations;

namespace Bilhet.Repository.Migrations
{
    public partial class Ajuste_Fidelidade_Email : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Fidelidade",
                table: "Fidelidade");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Fidelidade",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Fidelidade",
                table: "Fidelidade",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Fidelidade",
                table: "Fidelidade");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Fidelidade",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Fidelidade",
                table: "Fidelidade",
                column: "Email");
        }
    }
}
