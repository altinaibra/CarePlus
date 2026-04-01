import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FinancialSettings: React.FC = () => {
  const { t } = useTranslation();

  const [taxRate, setTaxRate] = useState("18");
  const [currency, setCurrency] = useState("EUR");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState("1001");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.finance")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.financeDescription")}
        </p>
      </div>

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

      <button className="px-4 py-2 rounded bg-slate-700 text-white dark:[background-color:oklch(47.6%_0.114_61.907)]">
        {t("settingsPage.save")}
      </button>
    </div>
  );
};

export default FinancialSettings;
