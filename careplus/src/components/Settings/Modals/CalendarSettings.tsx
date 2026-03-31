import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { holidayAPI, type Holiday } from "../../../app/calendar";
import { FaTrash, FaSave, FaEdit } from "react-icons/fa";

const CalendarSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const role = useSelector((state: RootState) => state.auth.role);
  const isAdmin = role === "admin" || role === "administrator";

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const [editingId, setEditingId] = useState<Holiday["id"] | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    loadHolidays();
  }, []);

  const loadHolidays = async () => {
    try {
      const res = await holidayAPI.getAll();
      setHolidays(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addHoliday = async () => {
    if (!isAdmin) {
      showSnackbar(
        t("calendar.adminOnly", "Only administrators can edit holidays."),
        "error",
      );
      return;
    }

    if (!name || !date) {
      showSnackbar(t("calendar.fillAllFields"), "error");
      return;
    }

    try {
      await holidayAPI.create({ name, date, comment });
      showSnackbar(t("calendar.holidayAdded"), "success");
      setName("");
      setDate("");
      setComment("");
      loadHolidays();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHoliday = async (id: Holiday["id"]) => {
    if (!isAdmin) {
      showSnackbar(
        t("calendar.adminOnly", "Only administrators can edit holidays."),
        "error",
      );
      return;
    }

    try {
      await holidayAPI.delete(id);
      showSnackbar(t("calendar.holidayDeleted"), "success");
      loadHolidays();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (holiday: Holiday) => {
    setEditingId(holiday.id);
    setEditedName(holiday.name);
    setEditedDate(holiday.date);
    setEditedComment(holiday.comment ?? "");
  };

  const saveEdit = async (id: Holiday["id"]) => {
    if (!isAdmin) {
      showSnackbar(
        t("calendar.adminOnly", "Only administrators can edit holidays."),
        "error",
      );
      return;
    }

    if (!editedName || !editedDate) {
      showSnackbar(t("calendar.fillAllFields"), "error");
      return;
    }

    try {
      await holidayAPI.update(id, {
        name: editedName,
        date: editedDate,
        comment: editedComment,
      });

      showSnackbar(t("calendar.holidayUpdated"), "success");
      setEditingId(null);
      setEditedComment("");
      loadHolidays();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t("settingsPage.calendar")}</h2>

      {isAdmin ? (
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300 text-sm">
                {t("calendar.holidayName")}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
            p-2 bg-white dark:bg-[oklch(20.5%_0_0)]
            border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)]
            text-gray-900 dark:text-white rounded
          "
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300 text-sm">
                {t("calendar.holidayDate")}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                custom-date-input
                orbit-borders
                p-2 w-full rounded
                bg-white dark:bg-[oklch(20.5%_0_0)]
                border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)]
                text-gray-900 dark:text-gray-100
                "
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-gray-300 text-sm">
              {t("calendar.holidayComment", "Comment")}
            </label>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="
            block w-full p-2 rounded
            bg-white dark:bg-[oklch(20.5%_0_0)]
            border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)]
            text-gray-900 dark:text-gray-100
            "
              placeholder={t(
                "calendar.commentPlaceholder",
                "Add an optional comment",
              )}
            />
          </div>

          <button
            onClick={addHoliday}
            className="
            px-4 py-2 mt-2
            bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]
            text-white rounded
        "
          >
            {t("calendar.add")}
          </button>
        </div>
      ) : (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        </div>
      )}

      <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

      <div className="flex flex-col gap-2">
        {holidays.map((holiday) => (
          <div
            key={holiday.id}
            className="flex justify-between items-center p-3 
            bg-white dark:[background-color:oklch(20.5%_0_0)]
            border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
            rounded"
          >
            {editingId === holiday.id ? (
              <div className="flex-1 flex flex-wrap gap-2">

                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="
                    p-2 flex-1 rounded
                    bg-white dark:bg-[oklch(20.5%_0_0)]
                    border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)]
                    text-gray-900 dark:text-white
                "
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="
                custom-date-input
                orbit-borders
                p-2 w-full rounded
                bg-white dark:bg-[oklch(20.5%_0_0)]
                border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)]
                text-gray-900 dark:text-gray-100
                "
                />
                <input
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="
                    p-2 w-full rounded
                    bg-white dark:bg-[oklch(20.5%_0_0)]
                    border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)]
                    text-gray-900 dark:text-white
                "
                  placeholder={t(
                    "calendar.commentPlaceholder",
                    "Add an optional comment",
                  )}
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {holiday.name}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {holiday.date}
                </p>

                {holiday.comment ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {holiday.comment}
                  </p>
                ) : null}
              </div>
            )}

            {isAdmin ? (
              <div className="flex gap-2">
                {editingId === holiday.id ? (
                  <button
                    onClick={() => saveEdit(holiday.id)}
                    className="px-2 h-8 rounded bg-gray-500 
                    dark:[background-color:oklch(20.5%_0_0)]
                    border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
                    text-white"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(holiday)}
                    className="px-2 h-8 rounded bg-gray-500 
                    dark:[background-color:oklch(20.5%_0_0)]
                    border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
                    text-white"
                  >
                    <FaEdit />
                  </button>
                )}

                <button
                  onClick={() => deleteHoliday(holiday.id)}
                  className="px-2 h-8 rounded bg-slate-700 
                  dark:[background-color:oklch(47.6%_0.114_61.907)]
                  text-white hover:opacity-80 transition"
                >
                  <FaTrash />
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSettings;
