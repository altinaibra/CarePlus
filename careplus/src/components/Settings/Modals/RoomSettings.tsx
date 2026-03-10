import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { Room, roomAPI } from "../../../app/api";
import { FaTrash } from "react-icons/fa";

const RoomSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const [rooms, setRooms] = useState<Room[]>([]);

  const [roomNumber, setRoomNumber] = useState("");
  const [totalBeds, setTotalBeds] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await roomAPI.getAll();
      setRooms(res.data);
    } catch (error) {
      console.error("Error loading rooms", error);
    }
  };

  const addRoom = async () => {
    if (!roomNumber) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    try {
      await roomAPI.create({
        roomNumber,
        totalBeds,
        availableBeds: totalBeds,
        occupiedBeds: 0,
      });

      showSnackbar(t("settingsPage.roomAdded"), "success");

      setRoomNumber("");
      setTotalBeds(1);

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRoom = async (id: number | string) => {
    try {
      await roomAPI.delete(id);

      showSnackbar(t("settingsPage.roomDeleted"), "success");

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t("settingsPage.rooms")}</h2>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex flex-col">
          <label
            htmlFor="roomNumber"
            className="mb-1 text-gray-700 dark:text-gray-300 text-sm"
          >
            {t("settingsPage.roomNumber")}
          </label>
          <input
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder={t("settingsPage.roomNumber")}
            className="flex-1 p-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-gray-900 dark:text-white rounded"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label
            htmlFor="totalBeds"
            className="mb-1 text-gray-700 dark:text-gray-300 text-sm"
          >
            {t("settingsPage.totalBeds")}
          </label>
          <input
            id="totalBeds"
            type="number"
            value={totalBeds}
            onChange={(e) => setTotalBeds(Number(e.target.value))}
            placeholder={t("settingsPage.totalBeds")}
            className="flex-1 p-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-gray-900 dark:text-white rounded"
          />
        </div>

        <button
          onClick={addRoom}
          className="px-4 py-2 mt-6 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded"
        >
          {t("settingsPage.add")}
        </button>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

      <div className="flex flex-col gap-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex justify-between items-center p-3 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white rounded"
          >
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                {t("settingsPage.room")} {room.roomNumber}
              </p>
              <p className="text-sm text-gray-500">
                {t("settingsPage.totalBeds")}: {room.totalBeds}
              </p>
            </div>

            <button
              onClick={() => deleteRoom(room.id)}
              className="px-2 h-8 rounded text-white hover:opacity-80 transition bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)]"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSettings;
