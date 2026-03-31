import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { departmentAPI, roomAPI, type Room } from "../app/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

interface Department {
  id: string | number;
  name: string;
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    fetchDepartmentsAndRooms();
  }, []);

  const fetchDepartmentsAndRooms = async () => {
    try {
      const [deptRes, roomsRes] = await Promise.all([
        departmentAPI.getAll(),
        roomAPI.getAll(),
      ]);

      setDepartments(deptRes.data);
      setAllRooms(roomsRes.data);
    } catch (error) {
      console.error("Error loading departments or rooms", error);
    }
  };

  const openDepartment = (id: string | number) => {
    navigate(`/departments/${id}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleLogout();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); 

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
                rounded-lg p-5 shadow-md
                bg-white dark:[background-color:oklch(20.5%_0_0)]
                text-gray-900 dark:text-gray-100
               relative border-animated
              `}
            >
              <h3
                className="text-lg font-semibold mb-2 cursor-pointer"
                onClick={() => openDepartment(dept.id)}
              >
                {dept.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            {t("home.rooms") || "Rooms"}
          </h2>

          {allRooms.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              {t("home.noRooms") || "No rooms available."}
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
              {allRooms.map((room) => (
                <div
                  key={room.id}
                  className={`
                     border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
                    w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)]
                    rounded-lg p-5 shadow-md bg-white dark:[background-color:oklch(20.5%_0_0)]
                    text-gray-900 dark:text-gray-100
                  `}
                >
                  <div></div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2">
                      {t("home.roomLabel", { number: room.roomNumber }) ||
                        `Dhoma: ${room.roomNumber}`}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p>
                        {t("home.totalBeds") || "Total beds"}: {room.totalBeds}
                      </p>
                      <p>
                        {t("home.availableBeds") || "Available"}:{" "}
                        {room.availableBeds}
                      </p>
                      <p>
                        {t("home.occupiedBeds") || "Occupied"}:{" "}
                        {room.occupiedBeds}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
