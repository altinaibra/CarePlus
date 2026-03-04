import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createAppointment } from "./appointmentsSlice";
import { fetchDoctors, Doctor } from "../doctors/doctorsSlice";
import { fetchPatients } from "../patients/patientsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Patient } from "../../app/api";
import styles from "../../styles/AppointmentFormStyles";

interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}

const AppointmentForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const doctors = useSelector(
    (state: RootState) => state.doctors.list,
  ) as Doctor[];
  const patients = useSelector(
    (state: RootState) => state.patients.list,
  ) as Patient[];

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  useEffect(() => {
    if (doctors.length === 0) dispatch(fetchDoctors());
    if (patients.length === 0) dispatch(fetchPatients());
  }, [dispatch, doctors.length, patients.length]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.patientId || !formData.doctorId) {
      alert("Please select both patient and doctor");
      return;
    }

    const appointmentDate = new Date(`${formData.date}T${formData.time}`);

    dispatch(
      createAppointment({
        PatientId: parseInt(formData.patientId),
        DoctorId: parseInt(formData.doctorId),
        AppointmentDate: appointmentDate.toISOString(),
        Date: new Date().toISOString(),
        Reason: formData.reason,
        Status: "Scheduled",
      }),
    );

    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.header}>{t("appointments.addNew")}</h3>

      <select
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        required
        className={styles.input}
      >
        <option value="">{t("appointments.selectPatient")}</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.firstName} {p.lastName}
          </option>
        ))}
      </select>

      <select
        name="doctorId"
        value={formData.doctorId}
        onChange={handleChange}
        required
        className={styles.input}
      >
        <option value="">{t("appointments.selectDoctor")}</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            Dr. {d.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <textarea
        name="reason"
        placeholder={t("appointments.reason")}
        value={formData.reason}
        onChange={handleChange}
        required
        className={styles.textarea}
        style={{ minHeight: "80px" }}
      />

      <button type="submit" className={styles.buttonPrimary}>
        {t("appointments.addButton")}
      </button>
    </form>
  );
};

export default AppointmentForm;
