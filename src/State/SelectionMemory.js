import React, { Component } from "react";
import { AsyncStorage } from "react-native";

var selectionCache = -1;

export const setSelection = (value) => {
  try {
    AsyncStorage.setItem('@Selection:Selection', value);
    selectionCache = value;
  } catch (error) {
    console.log(error);
  }
}

export const getSelection = (success) => {
  if (selectionCache === -1) { // Keep data in cache
    AsyncStorage.getItem('@Selection:Selection').then(result => success(result));
  } else {
    success(selectionCache);
  }
}
