import React, { Component } from "react";
import { AsyncStorage } from "react-native";

export default class CollectionMemory extends Component {

  static async addCard(collection, result) {
    try {
      await AsyncStorage.setItem('@Collections:' + collection, result);
    } catch (error) {
      console.log(error);
    }
  }

  static async getCollection(success) {
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
          });
    });
  }
}
