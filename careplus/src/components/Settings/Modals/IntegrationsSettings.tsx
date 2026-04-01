import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IntegrationSetting,
  integrationsAPI,
} from "../../../app/settingsApi";

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
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.integrations")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.integrationsDescription")}
        </p>
      </div>
      {status === "loading" && (
        <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>
      )}
      {status === "saved" && <p className="text-sm text-green-600">Saved.</p>}
      {status === "error" && (
        <p className="text-sm text-red-600">Failed to save integrations.</p>
      )}

      <div className="space-y-3">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded p-3"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-medium">{item.name}</span>
              <button
                onClick={() => toggle(item.id)}
                className="px-2 py-1 rounded text-xs border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
              >
                {item.enabled ? t("settingsPage.enabled") : t("settingsPage.disabled")}
              </button>
            </div>

            <input
              value={item.apiKey}
              onChange={(e) => setApiKey(item.id, e.target.value)}
              onBlur={() => {
                void handleApiKeyBlur(item.id);
              }}
              placeholder="API Key / Endpoint"
              className="w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsSettings;
