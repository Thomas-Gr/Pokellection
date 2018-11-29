import React, { Component } from "react";
import { AsyncStorage } from "react-native";

var selectionCache = -1;
var displayCache = -1;

export const setSelection = (value) => {
  try {
    AsyncStorage.setItem('@Configuration:Selection', value);
    selectionCache = value;
  } catch (error) {
    console.log(error);
  }
}

export const getSelection = (success) => {
  if (selectionCache === -1) { // Keep data in cache
    AsyncStorage.getItem('@Configuration:Selection').then(result => success(result));
  } else {
    success(selectionCache);
  }
}

export const setDisplay = (value) => {
  try {
    AsyncStorage.setItem('@Configuration:Display', value);
    displayCache = value;
  } catch (error) {
    console.log(error);
  }
}

export const getDisplay = (success) => {
  if (displayCache === -1) { // Keep data in cache
    AsyncStorage.getItem('@Configuration:Display').then(result => success(result));
  } else {
    success(displayCache);
  }
}
