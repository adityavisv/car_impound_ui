import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";

i18n
//  .use(LanguageDetector)
 .use(initReactI18next)
 .use(Backend)
 .init({

   fallbackLng: "en",
   debug: true,
 });

 export default i18n;

