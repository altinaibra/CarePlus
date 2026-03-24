import React, { useEffect, useState } from "react";
import { Laboratory } from "../app/laboratory";
import LaboratoryPageStyles from "../styles/LaboratoryPageStyles";

const LaboratoryPage: React.FC = () => {
  const [labTypes, setLabTypes] = useState<Laboratory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const defaultLabs: Laboratory[] = [
      {
        id: 1,
        name: "Complete Blood Count",
        description:
          "Measures red & white blood cells, hemoglobin, hematocrit, and platelets",
        price: 25,
        unit: "test",
        status: true,
        userId: "lab1",
      },
      {
        id: 2,
        name: "Blood Glucose",
        description: "Measures the level of glucose in the blood",
        price: 15,
        unit: "mg/dL",
        status: true,
        userId: "lab1",
      },
      {
        id: 3,
        name: "Cholesterol Test",
        description: "Measures total cholesterol, LDL, HDL, and triglycerides",
        price: 30,
        unit: "mg/dL",
        status: true,
        userId: "lab1",
      },
      {
        id: 4,
        name: "Urine Analysis",
        description:
          "Checks for kidney function, infection, and metabolic disorders",
        price: 20,
        unit: "sample",
        status: true,
        userId: "lab1",
      },
    ];

    setLabTypes(defaultLabs);
  }, []);

  const filteredLabs = labTypes.filter(
    (lab) =>
      (lab.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lab.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={LaboratoryPageStyles.container}>
      <h2 className={LaboratoryPageStyles.title}>Laboratory Analyses</h2>
      <div className="relative mb-4 max-w-md">
        <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 4a6 6 0 016 6c0 1.39-.47 2.67-1.26 3.68l4.29 4.29-1.42 1.42-4.29-4.29A6 6 0 1110 4z"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full
            p-2
            pl-9
            bg-white dark:[background-color:oklch(20.5%_0_0)]
            border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
            text-gray-900 dark:text-gray-100
            rounded-md
          "
        />
      </div>

      <table className={LaboratoryPageStyles.table}>
        <thead>
          <tr>
            <th className={LaboratoryPageStyles.th}>Name</th>
            <th className={LaboratoryPageStyles.th}>Description</th>
            <th className={LaboratoryPageStyles.th}>Price</th>
            <th className={LaboratoryPageStyles.th}>Unit</th>
          </tr>
        </thead>
        <tbody>
          {filteredLabs.length > 0 ? (
            filteredLabs.map((lab) => (
              <tr key={lab.id} className={LaboratoryPageStyles.trHover}>
                <td className={LaboratoryPageStyles.td}>{lab.name}</td>
                <td className={LaboratoryPageStyles.td}>{lab.description}</td>
                <td className={LaboratoryPageStyles.td}>
                  {lab.price.toFixed(2)}
                </td>
                <td className={LaboratoryPageStyles.td}>{lab.unit}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={LaboratoryPageStyles.td} colSpan={4}>
                No analyses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LaboratoryPage;
