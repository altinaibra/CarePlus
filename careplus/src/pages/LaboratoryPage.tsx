import React, { useEffect, useState } from "react";
import { Laboratory } from "../app/laboratory";
import LaboratoryPageStyles from "../styles/LaboratoryPageStyles";

const LaboratoryPage: React.FC = () => {
  const [labTypes, setLabTypes] = useState<Laboratory[]>([]);

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

  return (
    <div className={LaboratoryPageStyles.container}>
      <h2 className={LaboratoryPageStyles.title}>Laboratory Analyses</h2>

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
          {labTypes.map((lab) => (
            <tr key={lab.id} className={LaboratoryPageStyles.trHover}>
              <td className={LaboratoryPageStyles.td}>{lab.name}</td>
              <td className={LaboratoryPageStyles.td}>{lab.description}</td>
              <td className={LaboratoryPageStyles.td}>
                {lab.price.toFixed(2)}
              </td>
              <td className={LaboratoryPageStyles.td}>{lab.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaboratoryPage;
