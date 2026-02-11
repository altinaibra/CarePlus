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
    <div className="p-10 text-center">
      {/* <h1 className="text-4xl font-bold mb-4">{t("home.welcome")}</h1> */}
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        {t("home.subtitle")}
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">{t("home.departments")}</h2>
        <div className="flex justify-center gap-5 flex-wrap">
          {hospitalInfo.map((dept, idx) => (
            <div
              key={idx}
              className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-lg p-5 w-48 shadow-md hover:shadow-lg transition bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100"
            >
              <h3 className="text-lg font-semibold mb-2">{dept.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
