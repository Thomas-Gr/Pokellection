import React, { Component } from "react";
import { AsyncStorage } from "react-native";

var cardsCache = {};

export const addCard = (collection, result) => {
  try {
    AsyncStorage.setItem('@Collections:' + collection, JSON.stringify(result));
    cardsCache[collection] = result;
  } catch (error) {
    console.log(error);
  }
}

export const getCollection = (success) => {
  if (Object.keys(cardsCache).length === 0) { // Keep data in cache
    AsyncStorage.getAllKeys().then(result => {
      Promise.all(result.map(key => AsyncStorage.getItem(key)))
          .then((collection) => {
            var collections = {};

            collection.forEach((value, index) => {
              if (result[index].startsWith("@Collections:")) {
                collections[result[index].substr(13)] = JSON.parse(value);
              }
            });

            success(collections);
            cardsCache = collections;
          });
    });
  } else {
    success(cardsCache);
  }
}
