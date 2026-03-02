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
  departmentId?: string | number;
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentsAndRooms();
  }, []);

  const fetchDepartmentsAndRooms = async () => {
    try {
      const [deptRes, roomsRes] = await Promise.all([
        departmentAPI.getAll(),
        roomAPI.getAll(),
      ]);

      setDepartments(deptRes.data as Department[]);
      setAllRooms(roomsRes.data as Room[]);
    } catch (error) {
      console.error("Error loading departments or rooms", error);
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

              {/* Departments section tani nuk shfaq më rooms brenda çdo department */}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          {t("home.rooms") || "Rooms"}
        </h2>

        <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
          {allRooms.map((room) => (
            <div
              key={room.id}
              className={`
                w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)]
                border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
                rounded-lg p-5 shadow-md hover:shadow-lg transition
                bg-white dark:[background-color:oklch(20.5%_0_0)]
                text-gray-900 dark:text-gray-100
              `}
            >
              <h3 className="text-lg font-semibold mb-2">
                {t("home.roomNumber", { number: room.roomNumber }) ||
                  room.roomNumber}
              </h3>
              {room.departmentId && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("home.departmentId", { id: room.departmentId }) ||
                    `Department: ${room.departmentId}`}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
