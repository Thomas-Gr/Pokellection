import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import ReactNative from 'react-native';

import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ja from '../locales/ja.json';

i18n.defaultLocale = "en";
i18n.locale = "fr";
i18n.fallbacks = true;
i18n.translations = { en, fr, ja };

export function string(name, params = {}) {
  return i18n.t(name, params);
};

export function changeLanguage(language) {
  i18n.locale = language;
};

export function language(language, data) {
  if (language == 'fr' && data.frenchName != null) {
    return data.frenchName;
  }

  if (language == 'ja' && data.japaneseName != null) {
    return data.japaneseName;
  }

  return data.name;
}

export default i18n;
