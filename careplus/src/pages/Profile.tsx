import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/ProfileStyles";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../ui/SnackbarContext";
import { patientAPI, doctorAPI, APIDoctor } from "../app/api";

interface ProfileData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  contact: string;
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    contact: "",
  });
  const [userId, setUserId] = useState<number | string | null>(null); 

  const role = localStorage.getItem("role"); 
  const username = localStorage.getItem("username"); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!role || !username) return;

        if (role === "patient") {
          const res = await patientAPI.getAll();
          const patient = res.data.find(
            (p) => p.email === username || p.id.toString() === username,
          );
          if (patient) {
            setUserId(patient.id);
            setProfileData({
              firstName: patient.firstName,
              lastName: patient.lastName,
              age: patient.age?.toString() || "",
              email: patient.email || "",
              contact: patient.phone || "",
            });
          }
        } else if (role === "doctor" || role === "admin") {
          const res = await doctorAPI.getAll();
          const doctor = res.data.find((d) => d.email === username);
          if (doctor) {
            setUserId(doctor.id);
            setProfileData({
              firstName: doctor.firstName,
              lastName: doctor.lastName,
              age: "", 
              email: doctor.email || "",
              contact: doctor.phone || "",
            });
          }
        }
      } catch (err) {
        console.error(err);
        showSnackbar(t("Failed to fetch profile data"), "error");
      }
    };

    fetchProfile();
  }, [role, username, showSnackbar, t]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    try {
      if (role === "patient") {
        await patientAPI.update(userId, {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          age: Number(profileData.age),
          email: profileData.email,
          phone: profileData.contact,
        });
      } else if (role === "doctor") {
        await doctorAPI.update(userId, {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.contact,
        });
      }

      showSnackbar(t("Profile saved successfully!"), "success");
    } catch (err) {
      console.error(err);
      showSnackbar(t("Failed to save profile"), "error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("Profile")}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {(Object.keys(profileData) as (keyof ProfileData)[]).map((field) => (
          <div key={field}>
            <label className={styles.label}>
              {t(field.replace(/([A-Z])/g, " $1"))}:
            </label>
            <input
              type={
                field === "age"
                  ? "number"
                  : field === "email"
                    ? "email"
                    : "text"
              }
              name={field}
              value={profileData[field]}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Profile;
