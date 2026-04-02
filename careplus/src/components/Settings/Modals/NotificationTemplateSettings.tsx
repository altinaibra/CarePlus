import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  NotificationTemplate,
  notificationTemplatesAPI,
} from "../../../app/settingsApi";
import { NotificationTemplateStyles } from "../../../styles/NotificationTemplateStyles";
import { FaRegListAlt } from "react-icons/fa";

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
    <div className={NotificationTemplateStyles.container}>
      <div>
        <h2
          className={`${NotificationTemplateStyles.title} flex items-center gap-2`}
        >
          <FaRegListAlt className="text-primary dark:text-white" />
          {t("settingsPage.notificationTemplates")}
        </h2>
        <p className={NotificationTemplateStyles.description}>
          {t("settingsPage.notificationTemplatesDescription")}
        </p>
      </div>

      {error && <p className={NotificationTemplateStyles.errorText}>{error}</p>}
      {loading && (
        <p className={NotificationTemplateStyles.loadingText}>Loading...</p>
      )}

      <div className={NotificationTemplateStyles.newTemplateForm}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={t("settingsPage.templateTitle")}
          className={NotificationTemplateStyles.input}
        />
        <select
          value={newChannel}
          onChange={(e) =>
            setNewChannel(e.target.value as NotificationTemplate["channel"])
          }
          className={NotificationTemplateStyles.select}
        >
          <option>Email</option>
          <option>SMS</option>
          <option>In-App</option>
        </select>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("settingsPage.templateMessage")}
          className={NotificationTemplateStyles.textarea}
        />
        <button
          onClick={addTemplate}
          className={NotificationTemplateStyles.addButton}
        >
          {t("settingsPage.addTemplate")}
        </button>
      </div>

      <div className={NotificationTemplateStyles.templatesList}>
        {templates.map((tpl) => (
          <div key={tpl.id} className={NotificationTemplateStyles.templateCard}>
            <div className={NotificationTemplateStyles.templateHeader}>
              <h3 className={NotificationTemplateStyles.templateTitle}>
                {tpl.title}
              </h3>
              <span className={NotificationTemplateStyles.templateChannel}>
                {tpl.channel}
              </span>
            </div>
            <p className={NotificationTemplateStyles.templateMessage}>
              {tpl.message}
            </p>
            <button
              onClick={() => removeTemplate(tpl.id)}
              className={NotificationTemplateStyles.deleteButton}
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
