import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { FaBed, FaBuilding, FaHospital } from "react-icons/fa";
import { Hospital, hospitalAPI } from "../app/hospitalAPI";
import { HomeStyles } from "../styles/HomeStyles";
import { departmentAPI } from "../app/departmentAPI";
import { Room, roomAPI } from "../app/roomAPI";

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

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await hospitalAPI.getAll();
        if (res.data && res.data.length > 0) {
          setHospital(res.data[0]);
        }
      } catch (error) {
        console.error("Error loading hospital info", error);
      }
    };

    fetchHospital();
  }, []);
  return (
    <div className={HomeStyles.container}>
      <p className={HomeStyles.subtitle}>{t("home.subtitle")}</p>

      <div className="mt-8">
        <div className={HomeStyles.sectionHeaderContainer}>
          <FaHospital className={HomeStyles.sectionHeaderIcon} />
          <h2 className={HomeStyles.sectionHeaderTitle}>
            {t("home.departments")}
          </h2>
        </div>

        <div className={HomeStyles.cardsContainer}>
          {departments.map((dept) => (
            <div key={dept.id} className={HomeStyles.card}>
              <h3
                className={HomeStyles.cardTitle}
                onClick={() => openDepartment(dept.id)}
              >
                {dept.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className={HomeStyles.sectionHeaderContainer}>
            <FaBed className={HomeStyles.sectionHeaderIcon} />
            <h2 className={HomeStyles.sectionHeaderTitle}>{t("home.rooms")}</h2>
          </div>
          {allRooms.length === 0 ? (
            <p className={HomeStyles.noRooms}>
              {t("home.noRooms") || "No rooms available."}
            </p>
          ) : (
            <div className={HomeStyles.cardsContainer}>
              {allRooms.map((room) => (
                <div key={room.id} className={HomeStyles.roomCard}>
                  <div className="relative z-10">
                    <h3 className={HomeStyles.cardTitle}>
                      {t("home.roomLabel", { number: room.roomNumber }) ||
                        `Dhoma: ${room.roomNumber}`}
                    </h3>
                    <div className={HomeStyles.roomInfo}>
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
        <div className={HomeStyles.bottomBar}>
          <p className={HomeStyles.bottomBarName}>{hospital.name}</p>
          <p className={HomeStyles.bottomBarEmail}>{hospital.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
