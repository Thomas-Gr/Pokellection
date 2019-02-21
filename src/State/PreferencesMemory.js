import React, { Component } from "react";
import { AsyncStorage, Platform, NativeModules } from "react-native";

import HomeSerieConfig from '../Config/HomeSerieConfig.js';

var selectionCache = -1;
var languageCache = -1;

export const setSerieSelection = (value) => {
  try {
    AsyncStorage.setItem('@Preferences:SerieSelection', JSON.stringify(value));
    selectionCache = value;
  } catch (error) {
    console.log(error);
  }
}

export const getSerieSelection = (success) => {
  if (selectionCache === -1) { // Keep data in cache
    AsyncStorage.getItem('@Preferences:SerieSelection').then(result => success(result == null
      ? [].concat.apply([], HomeSerieConfig.map(obj => obj.data))
          .reduce((obj, item) => {
           obj[item] = true
           return obj
         }, {})
      : JSON.parse(result)));
  } else {
    success(selectionCache);
  }
}

export const setLanguage = (value) => {
  try {
    AsyncStorage.setItem('@Preferences:Language', value);
    languageCache = value;
  } catch (error) {
    console.log(error);
  }
}

export const getLanguage = (success) => {
  if (languageCache === -1) { // Keep data in cache
    const locale = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;
    AsyncStorage.getItem('@Preferences:Language')
        .then(result => success(result == null ? locale.split("_")[0] : result));
  } else {
    success(languageCache);
  }
}
