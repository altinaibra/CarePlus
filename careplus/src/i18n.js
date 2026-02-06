import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import alTranslation from "./locales/al.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    al: {
      translation: alTranslation,
    },
  },
  lng: localStorage.getItem("language") || "al",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
