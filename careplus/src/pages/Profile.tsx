import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/ProfileStyles";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../ui/SnackbarContext";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Profile saved:", profileData);
    showSnackbar(t("Profile saved successfully!"), "success"); 
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
        <button type="submit" className={styles.button}>
          {t("Save")}
        </button>
      </form>
    </div>
  );
};

export default Profile;
