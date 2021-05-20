import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from '_assets/locales/en/translation.json'
import translationES from '_assets/locales/es/translation.json'
import * as RNLocalize from "react-native-localize";

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: RNLocalize.getLocales().length > 0 ? RNLocalize.getLocales()[0]["languageCode"] : 'en',
  fallbackLng: 'es',
});

export default i18n;
