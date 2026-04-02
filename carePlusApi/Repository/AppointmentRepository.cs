using CarePlusApi.Data;
using CarePlusApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CarePlusApi.Repository
{
    public class AppointmentRepository
    {
        private readonly AppDbContext _context;

        public AppointmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Appointment>> GetAllAsync()
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .ToListAsync();
        }
        public async Task<Appointment?> GetByIdAsync(int id)
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
        public async Task<Appointment> CreateAsync(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return appointment;
        }

        public async Task<Appointment?> UpdateAsync(int id, Appointment appointment)
        {
            var existing = await _context.Appointments.FindAsync(id);
            if (existing == null) return null;

            existing.PatientId = appointment.PatientId;
            existing.DoctorId = appointment.DoctorId;
            existing.AppointmentDate = appointment.AppointmentDate;
            existing.Date = appointment.Date;
            existing.Reason = appointment.Reason;
            existing.Status = appointment.Status;

            _context.Appointments.Update(existing);
            await _context.SaveChangesAsync();
            return existing;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.Appointments.FindAsync(id);
            if (existing == null) return false;

            _context.Appointments.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
