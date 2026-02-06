import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAppointment } from "./appointmentsSlice";

const AppointmentList = () => {
  const appointments = useSelector((state) => state.appointments.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Lista e Takimeve</h3>
      {appointments.length === 0 ? (
        <p>Nuk ka takime të regjistruara.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Pacienti
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Doktori
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Data
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Ora</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Arsyeja
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Aksione
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.patientName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.doctorName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.date}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.time}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.reason}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => dispatch(deleteAppointment(appointment.id))}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Fshij
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;
