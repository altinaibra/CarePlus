import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { departmentAPI } from "../../app/api";

interface Department {
  id: number;
  name: string;
}

const departmentColors: Record<string, string> = {
  Cardiology: "bg-red-200",
  Radiology: "bg-blue-200",
  Emergency: "bg-yellow-200",
  Neurology: "bg-purple-200",
  Pediatrics: "bg-green-200",
  default: "bg-gray-200",
};

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    if (!id) return; 

    const fetchDepartment = async () => {
      try {
        const res = await departmentAPI.getById(id);
        setDepartment(res.data as Department);
      } catch (error) {
        console.error("Error loading department", error);
      }
    };

    fetchDepartment();
  }, [id]);

  if (!department) return <p className="text-center mt-10">Loading...</p>;

  const bgColor = departmentColors[department.name] || departmentColors.default;

  return (
    <div className={`${bgColor} min-h-screen flex items-center justify-center`}>
      <div className="p-10 max-w-2xl rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-4">{department.name}</h1>
        <p className="text-lg">ID: {department.id}</p>
      </div>
    </div>
  );
};

export default DepartmentDetails;
