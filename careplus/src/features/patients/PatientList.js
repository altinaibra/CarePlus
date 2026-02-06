import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePatient } from "./patientsSlice";

const PatientList = () => {
  const patients = useSelector((state) => state.patients.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Lista e Pacientëve</h3>
      {patients.length === 0 ? (
        <p>Nuk ka pacientë të regjistruar.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Emri
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Telefon
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Mosha
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Adresa
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Aksione
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.phone}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.age}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.address}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => dispatch(deletePatient(patient.id))}
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

export default PatientList;
