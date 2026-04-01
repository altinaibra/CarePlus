import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IntegrationSetting, integrationsAPI } from "../../../app/settingsApi";
import { IntegrationsSettingsStyles } from "../../../styles/IntegrationsSettingsStyles";

const IntegrationsSettings: React.FC = () => {
  const { t } = useTranslation();
  const [integrations, setIntegrations] = useState<IntegrationSetting[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadIntegrations = async () => {
      setStatus("loading");
      try {
        const res = await integrationsAPI.getAll();
        setIntegrations(res.data);
        setStatus("");
      } catch {
        setStatus("error");
      }
    };

    void loadIntegrations();
  }, []);

  const saveIntegration = async (integration: IntegrationSetting) => {
    try {
      const res = await integrationsAPI.update(integration.id, {
        name: integration.name,
        enabled: integration.enabled,
        apiKey: integration.apiKey,
      });
      setIntegrations((prev) =>
        prev.map((item) => (item.id === integration.id ? res.data : item)),
      );
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  const toggle = async (id: number) => {
    const item = integrations.find((x) => x.id === id);
    if (!item) return;

    const updated: IntegrationSetting = { ...item, enabled: !item.enabled };
    setIntegrations((prev) => prev.map((x) => (x.id === id ? updated : x)));
    await saveIntegration(updated);
  };

  const setApiKey = (id: number, key: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, apiKey: key } : item)),
    );
  };

  const handleApiKeyBlur = async (id: number) => {
    const item = integrations.find((x) => x.id === id);
    if (!item) return;
    await saveIntegration(item);
  };

  return (
    <div className={IntegrationsSettingsStyles.container}>
      <div>
        <h2 className={IntegrationsSettingsStyles.title}>
          {t("settingsPage.integrations")}
        </h2>
        <p className={IntegrationsSettingsStyles.description}>
          {t("settingsPage.integrationsDescription")}
        </p>
      </div>

      {status === "loading" && (
        <p className={IntegrationsSettingsStyles.loading}>Loading...</p>
      )}
      {status === "saved" && (
        <p className={IntegrationsSettingsStyles.success}>Saved.</p>
      )}
      {status === "error" && (
        <p className={IntegrationsSettingsStyles.error}>
          Failed to save integrations.
        </p>
      )}

      <div className={IntegrationsSettingsStyles.integrationsList}>
        {integrations.map((item) => (
          <div
            key={item.id}
            className={IntegrationsSettingsStyles.integrationCard}
          >
            <div className={IntegrationsSettingsStyles.integrationHeader}>
              <span className={IntegrationsSettingsStyles.integrationName}>
                {item.name}
              </span>
              <button
                onClick={() => toggle(item.id)}
                className={IntegrationsSettingsStyles.toggleButton}
              >
                {item.enabled
                  ? t("settingsPage.enabled")
                  : t("settingsPage.disabled")}
              </button>
            </div>

            <input
              value={item.apiKey}
              onChange={(e) => setApiKey(item.id, e.target.value)}
              onBlur={() => {
                void handleApiKeyBlur(item.id);
              }}
              placeholder="API Key / Endpoint"
              className={IntegrationsSettingsStyles.apiKeyInput}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsSettings;
