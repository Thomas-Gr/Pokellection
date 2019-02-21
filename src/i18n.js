import I18n from 'react-native-i18n';
import ReactNative from 'react-native';

import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ja from '../locales/ja.json';

I18n.defaultLocale = "en";
I18n.locale = "fr";
I18n.fallbacks = true;
I18n.translations = { en, fr, ja };
ReactNative.I18nManager.allowRTL(false);

export function string(name, params = {}) {
  return I18n.t(name, params);
};

export function changeLanguage(language) {
  I18n.locale = language;
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

export default I18n;
