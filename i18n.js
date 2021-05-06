import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      'greeting-text': 'Hello',
    },
  },
  es: {
    translation: {
      'greeting-text': 'Hola',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'en',
});

export default i18n;
