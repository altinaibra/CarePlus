import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { holidayAPI, type Holiday } from "../../../app/calendarAPI";
import { FaTrash, FaSave, FaEdit, FaCalendarAlt } from "react-icons/fa";
import { CalendarSettingsStyles } from "../../../styles/CalendarSettingsStyles";

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
      showSnackbar(t("calendar.adminOnly"), "error");
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
    if (!isAdmin) return showSnackbar(t("calendar.adminOnly"), "error");
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
    if (!isAdmin) return showSnackbar(t("calendar.adminOnly"), "error");
    if (!editedName || !editedDate)
      return showSnackbar(t("calendar.fillAllFields"), "error");

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
    <div className={CalendarSettingsStyles.container}>
      <h2
        className={`${CalendarSettingsStyles.header} flex items-center gap-2`}
      >
        <FaCalendarAlt className="text-primary dark:text-white" />
        {t("settingsPage.calendar")}
      </h2>

      {isAdmin && (
        <div className={CalendarSettingsStyles.adminForm}>
          <div className={CalendarSettingsStyles.inputGroupWrapper}>
            <div className={CalendarSettingsStyles.inputGroup}>
              <label className={CalendarSettingsStyles.label}>
                {t("calendar.holidayName")}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={CalendarSettingsStyles.input}
              />
            </div>
            <div className={CalendarSettingsStyles.inputGroup}>
              <label className={CalendarSettingsStyles.label}>
                {t("calendar.holidayDate")}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={CalendarSettingsStyles.dateInput}
              />
            </div>
          </div>
          <div className={CalendarSettingsStyles.inputGroup}>
            <label className={CalendarSettingsStyles.label}>
              {t("calendar.holidayComment")}
            </label>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={CalendarSettingsStyles.commentInput}
              placeholder={t("calendar.commentPlaceholder")}
            />
          </div>
          <button
            onClick={addHoliday}
            className={CalendarSettingsStyles.addButton}
          >
            {t("calendar.add")}
          </button>
        </div>
      )}

      <div className={CalendarSettingsStyles.divider}></div>

      <div className="flex flex-col gap-2">
        {holidays.map((holiday) => (
          <div key={holiday.id} className={CalendarSettingsStyles.holidayItem}>
            {editingId === holiday.id ? (
              <div className={CalendarSettingsStyles.holidayEditWrapper}>
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className={CalendarSettingsStyles.editInput}
                />
                <input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className={CalendarSettingsStyles.editDateInput}
                />
                <input
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  placeholder={t("calendar.commentPlaceholder")}
                  className={CalendarSettingsStyles.editCommentInput}
                />
              </div>
            ) : (
              <div className={CalendarSettingsStyles.holidayInfo}>
                <p className={CalendarSettingsStyles.holidayName}>
                  {holiday.name}
                </p>
                <p className={CalendarSettingsStyles.holidayDate}>
                  {holiday.date}
                </p>
                {holiday.comment && (
                  <p className={CalendarSettingsStyles.holidayComment}>
                    {holiday.comment}
                  </p>
                )}
              </div>
            )}

            {isAdmin && (
              <div className={CalendarSettingsStyles.adminButtonsWrapper}>
                {editingId === holiday.id ? (
                  <button
                    onClick={() => saveEdit(holiday.id)}
                    className={CalendarSettingsStyles.saveButton}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(holiday)}
                    className={CalendarSettingsStyles.editButton}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => deleteHoliday(holiday.id)}
                  className={CalendarSettingsStyles.deleteButton}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSettings;
