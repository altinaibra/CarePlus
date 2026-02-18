import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { departmentAPI, roomAPI } from "../app/api";
import { useNavigate } from "react-router-dom";

interface Department {
  id: string | number;
  name: string;
}

interface Room {
  id: string | number;
  roomNumber: string;
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [rooms, setRooms] = useState<Record<string | number, Room[]>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await departmentAPI.getAll();
      setDepartments(res.data);

      // opsional: fetch rooms per department
      res.data.forEach(async (dept: Department) => {
        const roomRes = await roomAPI.getByDepartment(dept.id);
        setRooms((prev) => ({ ...prev, [dept.id]: roomRes.data }));
      });
    } catch (error) {
      console.error("Error loading departments", error);
    }
  };

  const openDepartment = (id: string | number) => {
    navigate(`/departments/${id}`);
  };

  const openRoom = (deptId: string | number, roomId: string | number) => {
    navigate(`/departments/${deptId}/rooms/${roomId}`);
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
              className={`
                w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)]
                border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
                rounded-lg p-5 shadow-md hover:shadow-lg transition
                bg-white dark:[background-color:oklch(20.5%_0_0)]
                text-gray-900 dark:text-gray-100
              `}
            >
              <h3
                className="text-lg font-semibold mb-2 cursor-pointer"
                onClick={() => openDepartment(dept.id)}
              >
                {dept.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {rooms[dept.id]?.map((room) => (
                  <span
                    key={room.id}
                    onClick={() => openRoom(dept.id, room.id)}
                    className="cursor-pointer px-3 py-1 bg-gray-200 dark:bg-[oklch(30%_0_0)] text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-[oklch(40%_0_0)] transition text-sm"
                  >
                    {room.roomNumber}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
