import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/ProfileStyles";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../ui/SnackbarContext";
import { patientAPI, doctorAPI } from "../app/api";
import axiosInstance from "../app/axiosInstance";

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
  const [userId, setUserId] = useState<string | null>(null);

  const role = localStorage.getItem("userRole"); // "patient", "doctor", or "admin"
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("authToken");

  // Set Authorization header for all API requests
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    }
  }, [token]);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const storedRole = localStorage.getItem("userRole");

        console.log("USER ID:", storedUserId);
        console.log("ROLE:", storedRole);

        if (!storedUserId || !storedRole) return;

        setUserId(storedUserId);

        if (storedRole === "patient") {
          const res = await patientAPI.getById(storedUserId);
          console.log("PATIENT:", res.data);

          setProfileData({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            age: res.data.age?.toString() || "",
            email: res.data.email || "",
            contact: res.data.phone || "",
          });
        }

        if (storedRole === "doctor" || storedRole === "admin") {
          const res = await doctorAPI.getById(storedUserId);
          console.log("DOCTOR:", res.data);

          setProfileData({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            age: "",
            email: res.data.email || "",
            contact: res.data.phone || "",
          });
        }
      } catch (err: any) {
        console.error("PROFILE ERROR:", err);
        showSnackbar(t("Failed to fetch profile data"), "error");
      }
    };

    fetchProfile();
  }, [showSnackbar, t]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !role) return;

    try {
      if (role === "patient") {
        await patientAPI.update(userId, {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          age: Number(profileData.age),
          email: profileData.email,
          phone: profileData.contact,
        });
      } else if (role === "doctor" || role === "admin") {
        await doctorAPI.update(userId, {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.contact,
        });
      }

      showSnackbar(t("Profile saved successfully!"), "success");
    } catch (err: any) {
      console.error("PROFILE SAVE ERROR:", err);
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

        <button
          type="submit"
          className={
            styles.button || "mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          }
        >
          {t("Save Profile")}
        </button>
      </form>
    </div>
  );
};

export default Profile;
