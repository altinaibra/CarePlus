import React, { useEffect, useState } from "react";
import LaboratoryPageStyles from "../styles/LaboratoryPageStyles";
import { typesOfAnalysesAPI, TypeOfAnalyses } from "../app/typesOfAnalyses";

const LaboratoryPage: React.FC = () => {
  const [labTypes, setLabTypes] = useState<TypeOfAnalyses[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await typesOfAnalysesAPI.getAll();
        setLabTypes(response.data); // vendos të dhënat nga API
      } catch (error) {
        console.error("Error fetching lab types:", error);
      }
    };

    fetchLabs();
  }, []);

  const filteredLabs = labTypes.filter(
    (lab) =>
      (lab.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lab.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={LaboratoryPageStyles.container}>
      <h2 className={LaboratoryPageStyles.title}>Types of Analyses</h2>
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
            w-full p-2 pl-9
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
