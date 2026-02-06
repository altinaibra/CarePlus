import React from "react";
import { useTranslation } from "react-i18next";

const hospitalInfo = [
  { title: "Cardiology", description: "Heart treatments and checkups" },
  { title: "Radiology", description: "X-rays, CT scans, MRI" },
  { title: "Emergency", description: "24/7 emergency services" },
];

const Home = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{t("home.welcome")}</h1>
      <p>{t("home.subtitle")}</p>

      <div style={{ marginTop: "30px" }}>
        <h2>{t("home.departments")}</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {hospitalInfo.map((dept, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                width: "200px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{dept.title}</h3>
              <p>{dept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
