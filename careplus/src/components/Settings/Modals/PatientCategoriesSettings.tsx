import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";

type Category = {
  id: number;
  name: string;
  details: string;
};

const PatientCategoriesSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const addCategory = () => {
    if (!name || !details) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    setCategories((prev) => [...prev, { id: Date.now(), name, details }]);
    setName("");
    setDetails("");
    showSnackbar(t("settingsPage.categoryAdded"), "success");
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
    showSnackbar(t("settingsPage.categoryDeleted"), "success");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {t("settingsPage.patientCategories")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("settingsPage.patientCategoriesDescription")}
        </p>
      </div>

      <div className="grid gap-3 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("settingsPage.categoryName")}
          className="w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={t("settingsPage.categoryDetails")}
          className="w-full p-2 border rounded min-h-[100px] bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />
        <button
          onClick={addCategory}
          className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-800"
        >
          {t("settingsPage.addCategory")}
        </button>
      </div>

      <div className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            {t("settingsPage.noCategories")}
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="p-3 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {category.details}
                  </p>
                </div>
                <button
                  onClick={() => deleteCategory(category.id)}
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

export default PatientCategoriesSettings;
