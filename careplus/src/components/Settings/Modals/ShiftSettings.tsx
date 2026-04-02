import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { FaClock } from "react-icons/fa";

type Shift = {
  id: number;
  name: string;
  start: string;
  end: string;
};

const ShiftSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const addShift = () => {
    if (!name || !start || !end) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    setShifts((prev) => [...prev, { id: Date.now(), name, start, end }]);
    setName("");
    setStart("");
    setEnd("");
    showSnackbar(t("settingsPage.shiftAdded"), "success");
  };

  const removeShift = (id: number) => {
    setShifts((prev) => prev.filter((shift) => shift.id !== id));
    showSnackbar(t("settingsPage.shiftRemoved"), "success");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaClock className="text-primary dark:text-white" />
          {t("settingsPage.shiftSchedule")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("settingsPage.shiftScheduleDescription")}
        </p>
      </div>

      <div className="grid gap-3 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("settingsPage.shiftName")}
          className="w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="custom-time-input w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
          />

          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="custom-time-input w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
          />
        </div>
        <button
          onClick={addShift}
          className="px-4 py-2 rounded bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white hover:bg-slate-800"
        >
          {t("settingsPage.addShift")}
        </button>
      </div>

      <div className="space-y-3">
        {shifts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            {t("settingsPage.noShifts")}
          </p>
        ) : (
          shifts.map((shift) => (
            <div
              key={shift.id}
              className="p-3 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold">{shift.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("settingsPage.shiftTime")}: {shift.start} - {shift.end}
                  </p>
                </div>
                <button
                  onClick={() => removeShift(shift.id)}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  {t("settingsPage.delete")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShiftSettings;
