import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/ProfileStyles";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../ui/SnackbarContext";
import { patientAPI, doctorAPI, adminAPI } from "../app/api";
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
  const [role, setRole] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const storedRole = localStorage.getItem("userRole");

        if (!storedUserId || !storedRole) return;

        const normalizedRole = storedRole.toLowerCase();
        setUserId(storedUserId);
        setRole(normalizedRole);

        if (normalizedRole === "patient") {
          const res = await patientAPI.getById(storedUserId);

          setProfileData({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            age: res.data.age?.toString() || "",
            email: res.data.email || "",
            contact: res.data.phone || "",
          });
        } else if (normalizedRole === "doctor") {
          const res = await doctorAPI.getById(storedUserId);

          setProfileData({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            age: "",
            email: res.data.email || "",
            contact: res.data.phone || "",
          });
        } else if (
          normalizedRole === "admin" ||
          normalizedRole === "administrator"
        ) {
          const res = await adminAPI.getById(storedUserId);
          const [first, ...rest] = (res.data.name || "").split(" ");

          setProfileData({
            firstName: first || "",
            lastName: rest.join(" ") || "",
            age: "",
            email: res.data.email || "",
            contact: res.data.phone || "",
          });
        }
      } catch (err: any) {
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
      } else if (role === "doctor") {
        await doctorAPI.update(userId, {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.contact,
        });
      } else if (role === "admin") {
        await adminAPI.update(userId, {
          name: `${profileData.firstName} ${profileData.lastName}`.trim(),
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

  const fieldsToRender: (keyof ProfileData)[] =
    role === "patient"
      ? ["firstName", "lastName", "age", "email", "contact"]
      : ["firstName", "lastName", "email", "contact"];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("Profile")}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {fieldsToRender.map((field) => (
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
