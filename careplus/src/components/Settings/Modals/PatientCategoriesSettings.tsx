import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { PatientCategoriesStyles } from "../../../styles/PatientCategoriesStyles";
import { FaUsers } from "react-icons/fa";

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
    <div className={PatientCategoriesStyles.container}>
      <div className={PatientCategoriesStyles.headerWrapper}>
        <h2
          className={`${PatientCategoriesStyles.headerTitle} flex items-center gap-2`}
        >
          <FaUsers className="text-primary dark:text-white" />
          {t("settingsPage.patientCategories")}
        </h2>
        <p className={PatientCategoriesStyles.headerDescription}>
          {t("settingsPage.patientCategoriesDescription")}
        </p>
      </div>

      <div className={PatientCategoriesStyles.inputGrid}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("settingsPage.categoryName")}
          className={PatientCategoriesStyles.input}
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={t("settingsPage.categoryDetails")}
          className={PatientCategoriesStyles.textarea}
        />
        <button
          onClick={addCategory}
          className={PatientCategoriesStyles.addButton}
        >
          {t("settingsPage.addCategory")}
        </button>
      </div>

      <div className={PatientCategoriesStyles.categoriesList}>
        {categories.length === 0 ? (
          <p className={PatientCategoriesStyles.noCategoriesText}>
            {t("settingsPage.noCategories")}
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className={PatientCategoriesStyles.categoryItem}
            >
              <div className={PatientCategoriesStyles.categoryContent}>
                <div className={PatientCategoriesStyles.categoryInfo}>
                  <h3 className={PatientCategoriesStyles.categoryTitle}>
                    {category.name}
                  </h3>
                  <p className={PatientCategoriesStyles.categoryDetails}>
                    {category.details}
                  </p>
                </div>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className={PatientCategoriesStyles.deleteButton}
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
