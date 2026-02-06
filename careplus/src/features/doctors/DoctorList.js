import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDoctor } from "./doctorsSlice";

const DoctorList = () => {
  const doctors = useSelector((state) => state.doctors.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Lista e Doktorëve</h3>
      {doctors.length === 0 ? (
        <p>Nuk ka doktorë të regjistruar.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Emri
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Specialiteti
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Telefon
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Licenca
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Aksione
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.speciality}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.phone}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.licenseNumber}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => dispatch(deleteDoctor(doctor.id))}
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

export default DoctorList;
