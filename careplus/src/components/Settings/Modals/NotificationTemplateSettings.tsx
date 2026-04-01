import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  NotificationTemplate,
  notificationTemplatesAPI,
} from "../../../app/settingsApi";

const NotificationTemplateSettings: React.FC = () => {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newChannel, setNewChannel] =
    useState<NotificationTemplate["channel"]>("Email");
  const [newMessage, setNewMessage] = useState("");

  const loadTemplates = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await notificationTemplatesAPI.getAll();
      setTemplates(res.data);
    } catch {
      setError("Failed to load templates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTemplates();
  }, []);

  const addTemplate = async () => {
    if (!newTitle.trim() || !newMessage.trim()) return;
    setError("");
    try {
      const res = await notificationTemplatesAPI.create({
        title: newTitle.trim(),
        channel: newChannel,
        message: newMessage.trim(),
        isActive: true,
      });
      setTemplates((prev) => [...prev, res.data]);
      setNewTitle("");
      setNewChannel("Email");
      setNewMessage("");
    } catch {
      setError("Failed to add template.");
    }
  };

  const removeTemplate = async (id: number) => {
    setError("");
    try {
      await notificationTemplatesAPI.delete(id);
      setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
    } catch {
      setError("Failed to delete template.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.notificationTemplates")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.notificationTemplatesDescription")}
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && (
        <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>
      )}

      <div className="grid grid-cols-1 gap-3">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={t("settingsPage.templateTitle")}
          className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        />

        <select
          value={newChannel}
          onChange={(e) =>
            setNewChannel(e.target.value as NotificationTemplate["channel"])
          }
          className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        >
          <option>Email</option>
          <option>SMS</option>
          <option>In-App</option>
        </select>

        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("settingsPage.templateMessage")}
          className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 min-h-[90px] bg-white dark:[background-color:oklch(20.5%_0_0)]"
        />

        <button
          onClick={addTemplate}
          className="w-fit px-4 py-2 rounded bg-slate-700 text-white dark:[background-color:oklch(47.6%_0.114_61.907)]"
        >
          {t("settingsPage.addTemplate")}
        </button>
      </div>

      <div className="space-y-2">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded p-3 bg-white dark:[background-color:oklch(20.5%_0_0)]"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{tpl.title}</h3>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                {tpl.channel}
              </span>
            </div>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{tpl.message}</p>
            <button
              onClick={() => removeTemplate(tpl.id)}
              className="mt-3 text-sm text-red-600 dark:text-red-400"
            >
              {t("settingsPage.delete")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationTemplateSettings;
