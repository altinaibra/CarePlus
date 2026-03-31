import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { departmentAPI, roomAPI, type Room } from "../app/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { FaBed, FaBuilding, FaHospital } from "react-icons/fa";
import { Hospital, hospitalAPI } from "../app/hospital";

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
  const [hospital, setHospital] = useState<Hospital | null>(null);
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

  // -------- FETCH HOSPITAL --------
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await hospitalAPI.getAll();
        if (res.data && res.data.length > 0) {
          setHospital(res.data[0]); // marrim të parin
        }
      } catch (error) {
        console.error("Error loading hospital info", error);
      }
    };

    fetchHospital();
  }, []);
  return (
    <div className="p-10 text-center">
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        {t("home.subtitle")}
      </p>

      <div className="mt-8">
        <div className="flex items-center justify-center mb-6">
          <FaHospital className="mr-2 text-gray-700 dark:text-white text-2xl" />
          <h2 className="text-2xl font-bold">{t("home.departments")}</h2>
        </div>

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
          <div className="flex items-center justify-center mb-6">
            <FaBed className="mr-2 text-gray-700 dark:text-white text-2xl" />
            <h2 className="text-2xl font-bold">{t("home.rooms")}</h2>
          </div>
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
                        {t("home.totalBeds")}: {room.totalBeds}
                      </p>
                      <p>
                        {t("home.availableBeds")}: {room.availableBeds}
                      </p>
                      <p>
                        {t("home.occupiedBeds")}: {room.occupiedBeds}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {hospital && (
        <div className="fixed bottom-0 left-0 w-full text-center py-4 bg-transparent text-gray-700 dark:text-gray-300">
          <p className="text-sm font-semibold">{hospital.name}</p>
          <p className="text-sm">{hospital.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
