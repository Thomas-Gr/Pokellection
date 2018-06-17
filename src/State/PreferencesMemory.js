import React, { Component } from "react";
import { AsyncStorage } from "react-native";

var selectionCache = -1;

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
    AsyncStorage.getItem('@Preferences:SerieSelection').then(result => success(JSON.parse(result)));
  } else {
    success(selectionCache);
  }
}
