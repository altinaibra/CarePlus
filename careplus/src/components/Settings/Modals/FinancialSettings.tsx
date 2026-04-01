import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { financialSettingsAPI } from "../../../app/settingsApi";

const FinancialSettings: React.FC = () => {
  const { t } = useTranslation();

  const [taxRate, setTaxRate] = useState("18");
  const [currency, setCurrency] = useState("EUR");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState("1001");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      setStatus("loading");
      try {
        const res = await financialSettingsAPI.get();
        setTaxRate(String(res.data.taxRate));
        setCurrency(res.data.currencyCode);
        setInvoicePrefix(res.data.invoicePrefix);
        setNextInvoiceNumber(String(res.data.nextInvoiceNumber));
        setStatus("");
      } catch {
        setStatus("error");
      }
    };

    void loadSettings();
  }, []);

  const saveSettings = async () => {
    setStatus("saving");
    try {
      const res = await financialSettingsAPI.save({
        taxRate: Number(taxRate) || 0,
        currencyCode: currency,
        invoicePrefix: invoicePrefix.trim(),
        nextInvoiceNumber: Number(nextInvoiceNumber) || 1,
      });
      setTaxRate(String(res.data.taxRate));
      setCurrency(res.data.currencyCode);
      setInvoicePrefix(res.data.invoicePrefix);
      setNextInvoiceNumber(String(res.data.nextInvoiceNumber));
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.finance")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.financeDescription")}
        </p>
      </div>
      {status === "loading" && (
        <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>
      )}
      {status === "saved" && <p className="text-sm text-green-600">Saved.</p>}
      {status === "error" && (
        <p className="text-sm text-red-600">Failed to save settings.</p>
      )}

      <section className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded p-4 space-y-3">
        <h3 className="font-semibold">{t("settingsPage.taxSettings")}</h3>
        <label className="text-sm block">{t("settingsPage.taxRate")}</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          className="w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        />
      </section>

      <section className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded p-4 space-y-3">
        <h3 className="font-semibold">{t("settingsPage.currencySettings")}</h3>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        >
          <option>EUR</option>
          <option>MKD</option>
          <option>CHF</option>
          <option>USD</option>
        </select>
      </section>

      <section className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded p-4 space-y-3">
        <h3 className="font-semibold">{t("settingsPage.invoiceSettings")}</h3>
        <input
          value={invoicePrefix}
          onChange={(e) => setInvoicePrefix(e.target.value)}
          placeholder={t("settingsPage.invoicePrefix")}
          className="w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        />
        <input
          type="number"
          value={nextInvoiceNumber}
          onChange={(e) => setNextInvoiceNumber(e.target.value)}
          placeholder={t("settingsPage.nextInvoiceNumber")}
          className="w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        />
      </section>

      <button
        onClick={saveSettings}
        className="px-4 py-2 rounded bg-slate-700 text-white dark:[background-color:oklch(47.6%_0.114_61.907)]"
      >
        {t("settingsPage.save")}
      </button>
    </div>
  );
};

export default FinancialSettings;
