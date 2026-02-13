import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { departmentAPI } from "../app/api";

const Home = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await departmentAPI.getAll();
      console.log("Departments:", res.data);
      setDepartments(res.data);
    } catch (error) {
      console.error("Error loading departments", error);
    }
  };

  return (
    <div className="p-10 text-center">
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        {t("home.subtitle")}
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">{t("home.departments")}</h2>

        <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="border border-gray-300 
                dark:[border-color:oklch(47.6%_0.114_61.907)] 
                rounded-lg p-5 w-56 h-40
                shadow-md hover:shadow-lg transition 
                bg-white dark:[background-color:oklch(20.5%_0_0)] 
                text-gray-900 dark:text-gray-100"
            >
              <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
