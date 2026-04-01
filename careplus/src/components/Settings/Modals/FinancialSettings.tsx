import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { financialSettingsAPI } from "../../../app/settingsApi";
import { FinancialSettingsStyles } from "../../../styles/FinancialSettingsStyles";

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
    <div className={FinancialSettingsStyles.container}>
      <div>
        <h2 className={FinancialSettingsStyles.title}>
          {t("settingsPage.finance")}
        </h2>
        <p className={FinancialSettingsStyles.description}>
          {t("settingsPage.financeDescription")}
        </p>
      </div>

      {status === "loading" && (
        <p className={FinancialSettingsStyles.loading}>Loading...</p>
      )}
      {status === "saved" && (
        <p className={FinancialSettingsStyles.success}>Saved.</p>
      )}
      {status === "error" && (
        <p className={FinancialSettingsStyles.error}>
          Failed to save settings.
        </p>
      )}

      <section className={FinancialSettingsStyles.section}>
        <h3 className={FinancialSettingsStyles.sectionTitle}>
          {t("settingsPage.taxSettings")}
        </h3>
        <label className="text-sm block">{t("settingsPage.taxRate")}</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          className={FinancialSettingsStyles.input}
        />
      </section>

      <section className={FinancialSettingsStyles.section}>
        <h3 className={FinancialSettingsStyles.sectionTitle}>
          {t("settingsPage.currencySettings")}
        </h3>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className={FinancialSettingsStyles.select}
        >
          <option>EUR</option>
          <option>MKD</option>
          <option>CHF</option>
          <option>USD</option>
        </select>
      </section>

      <section className={FinancialSettingsStyles.section}>
        <h3 className={FinancialSettingsStyles.sectionTitle}>
          {t("settingsPage.invoiceSettings")}
        </h3>
        <input
          value={invoicePrefix}
          onChange={(e) => setInvoicePrefix(e.target.value)}
          placeholder={t("settingsPage.invoicePrefix")}
          className={FinancialSettingsStyles.input}
        />
        <input
          type="number"
          value={nextInvoiceNumber}
          onChange={(e) => setNextInvoiceNumber(e.target.value)}
          placeholder={t("settingsPage.nextInvoiceNumber")}
          className={FinancialSettingsStyles.input}
        />
      </section>

      <button
        onClick={saveSettings}
        className={FinancialSettingsStyles.saveButton}
      >
        {t("settingsPage.save")}
      </button>
    </div>
  );
};

export default FinancialSettings;
