import { AsyncStorage } from "react-native";

var cardsCache = {};
var cardsCacheSeries = null;

export const addCard = (collection, result) => {
  try {
    AsyncStorage.setItem('@Collections:' + collection, JSON.stringify(result));
    cardsCache[collection] = result;
  } catch (error) {
    console.log(error);
  }
}

export const getCollection = (series, success) => {
  if (Object.keys(cardsCache).length === 0 || cardsCacheSeries == null || cardsCacheSeries != series) { // Keep data in cache
    AsyncStorage.getAllKeys().then(result => {
      var filteredResults = result
          .filter(key => key.startsWith("@Collections:"))
          .filter(key => series[key.substr(13)]);

      Promise.all(filteredResults
        .map(key => AsyncStorage.getItem(key)))
          .then((collection) => {
            var collections = {};

            collection.forEach((value, index) =>
                collections[filteredResults[index].substr(13)] = JSON.parse(value));

            success(collections);
            cardsCache = collections;
            selectedSeries = series;
          });
    });
  } else {
    success(cardsCache);
  }
}
