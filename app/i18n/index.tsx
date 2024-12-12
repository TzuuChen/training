import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/public/locales/en.json";
import zh_TW from "@/public/locales/zh_TW.json";

const resources = {
	en: {
		translation: en,
	},
	zh: {
		translation: zh_TW,
	},
};

i18n.use(initReactI18next).init({
	resources,
	fallbackLng: "zh_TW",
	lng: "zh_TW", // 預設語言
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
