using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carePlusApi.Migrations
{
    /// <inheritdoc />
    public partial class passwordHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Doctors",
                newName: "PasswordHash");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Doctors",
                newName: "Password");
        }
    }
}
