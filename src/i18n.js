import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import ar from "./locales/ar.json";
import zh from "./locales/zh.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
    ar: { translation: ar },
    zh: { translation: zh },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
