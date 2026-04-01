import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Template = {
  id: number;
  title: string;
  channel: "Email" | "SMS" | "In-App";
  message: string;
};

const NotificationTemplateSettings: React.FC = () => {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      title: t("settingsPage.templateNewVisit"),
      channel: "In-App",
      message: "A new appointment has been scheduled.",
    },
    {
      id: 2,
      title: t("settingsPage.templateCancellation"),
      channel: "SMS",
      message: "Your appointment has been cancelled.",
    },
    {
      id: 3,
      title: t("settingsPage.templatePaymentEmail"),
      channel: "Email",
      message: "Your invoice is ready. Please complete payment.",
    },
    {
      id: 4,
      title: t("settingsPage.templateSmsReminder"),
      channel: "SMS",
      message: "Reminder: you have an appointment tomorrow.",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newChannel, setNewChannel] = useState<Template["channel"]>("Email");
  const [newMessage, setNewMessage] = useState("");

  const addTemplate = () => {
    if (!newTitle.trim() || !newMessage.trim()) return;
    setTemplates((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTitle.trim(),
        channel: newChannel,
        message: newMessage.trim(),
      },
    ]);
    setNewTitle("");
    setNewChannel("Email");
    setNewMessage("");
  };

  const removeTemplate = (id: number) => {
    setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.notificationTemplates")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.notificationTemplatesDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={t("settingsPage.templateTitle")}
          className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        />

        <select
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value as Template["channel"])}
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
