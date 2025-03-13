import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import * as Localization from 'expo-localization';

// Import translations
import en from './translations/en';
import sw from './translations/sw';

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sw: { translation: sw },
    },
    lng: Localization.getLocales()[0]?.languageCode === 'sw' ? 'sw' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
