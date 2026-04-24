import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ru from './locales/ru';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
