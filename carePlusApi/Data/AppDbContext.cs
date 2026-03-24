using System.Collections.Generic;
using carePlusApi.Models;
using CarePlusApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<DepartmentDetail> DepartmentDetails { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Admission> Admissions { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Billing> Billing { get; set; }
        public DbSet<Nurse> Nurses { get; set; }
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }

        public DbSet<Printer> Printers { get; set; }
       public DbSet<LoginResponse> LoginResponses { get; set; }
    }
}