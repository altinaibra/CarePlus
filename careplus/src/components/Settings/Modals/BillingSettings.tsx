import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";

type BillingRule = {
  id: number;
  name: string;
  fee: number;
};

const BillingSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const [rules, setRules] = useState<BillingRule[]>([]);
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");

  const addRule = () => {
    if (!name || !fee) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    const feeValue = Number(fee);
    if (Number.isNaN(feeValue)) {
      showSnackbar(t("settingsPage.invalidFee"), "error");
      return;
    }

    setRules((prev) => [...prev, { id: Date.now(), name, fee: feeValue }]);
    setName("");
    setFee("");
    showSnackbar(t("settingsPage.billingRuleAdded"), "success");
  };

  const deleteRule = (id: number) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
    showSnackbar(t("settingsPage.billingRuleDeleted"), "success");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{t("settingsPage.billing")}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("settingsPage.billingDescription")}
        </p>
      </div>

      <div className="grid gap-3 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("settingsPage.billingName")}
          className="w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder={t("settingsPage.billingFee")}
          className="w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />
        <button
          onClick={addRule}
          className="px-4 py-2 rounded bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white"
        >
          {t("settingsPage.addBillingRule")}
        </button>
      </div>

      <div className="space-y-3">
        {rules.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            {t("settingsPage.noBillingRules")}
          </p>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.id}
              className="p-3 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold">{rule.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("settingsPage.fee")}: {rule.fee}
                  </p>
                </div>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  {t("settingsPage.delete")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BillingSettings;
