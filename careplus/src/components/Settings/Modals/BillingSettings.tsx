import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { BillingStyles } from "../../../styles/BillingStyles";

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
    <div className={BillingStyles.container}>
      <div className={BillingStyles.headerWrapper}>
        <h2 className={BillingStyles.headerTitle}>
          {t("settingsPage.billing")}
        </h2>
        <p className={BillingStyles.headerDesc}>
          {t("settingsPage.billingDescription")}
        </p>
      </div>

      <div className={BillingStyles.inputWrapper}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("settingsPage.billingName")}
          className={BillingStyles.input}
        />
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder={t("settingsPage.billingFee")}
          className={BillingStyles.input}
        />
        <button onClick={addRule} className={BillingStyles.addButton}>
          {t("settingsPage.addBillingRule")}
        </button>
      </div>

      <div className="space-y-3">
        {rules.length === 0 ? (
          <p className={BillingStyles.noRulesText}>
            {t("settingsPage.noBillingRules")}
          </p>
        ) : (
          rules.map((rule) => (
            <div key={rule.id} className={BillingStyles.ruleContainer}>
              <div className={BillingStyles.ruleWrapper}>
                <div>
                  <h3 className={BillingStyles.ruleName}>{rule.name}</h3>
                  <p className={BillingStyles.ruleFee}>
                    {t("settingsPage.fee")}: {rule.fee}
                  </p>
                </div>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className={BillingStyles.deleteButton}
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
