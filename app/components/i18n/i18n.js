import i18next from 'i18next';
import moment from 'moment';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languagesMap } from './languagesMap';
import { en, ru, ua } from './resources';

const isDevelopment = process.env.NODE_ENV === 'development';

const handleLangChange = (lang) => {
  moment.locale(lang);

  document.documentElement.setAttribute('lang', lang);
  document.title = i18next.t('head.title');
};

export const initI18n = () => {
i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(i18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: isDevelopment,
    fallbackLng: isDevelopment ? 'dev' : languagesMap.en,
    lng: window.localStorage.getItem('i18nextLng') || navigator.language ,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      [languagesMap.en]: {
        translation: en
      },
      [languagesMap.ru]: {
        translation: ru
      },
      [languagesMap.ua]: {
        translation: ua
      }
    }
  }, () => {
    handleLangChange(i18next.language);
  });
  

i18next.on('languageChanged', handleLangChange);
};
