import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Integration = {
  id: string;
  name: string;
  enabled: boolean;
  key: string;
};

const IntegrationsSettings: React.FC = () => {
  const { t } = useTranslation();
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "sms", name: "SMS API (Twilio/AlbSMS)", enabled: false, key: "" },
    { id: "smtp", name: "Email SMTP", enabled: false, key: "" },
    { id: "insurance", name: "Insurance API", enabled: false, key: "" },
    { id: "barcode", name: "Barcode API", enabled: false, key: "" },
  ]);

  const toggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const setApiKey = (id: string, key: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, key } : item)),
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.integrations")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.integrationsDescription")}
        </p>
      </div>

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
              value={item.key}
              onChange={(e) => setApiKey(item.id, e.target.value)}
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
