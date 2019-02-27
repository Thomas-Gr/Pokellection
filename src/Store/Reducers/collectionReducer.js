const initialState = { isLoaded: false, inLongSelectionMode: false }

import * as CollectionMemory from "../../State/CollectionMemory.js";
import * as PreferencesMemory from "../../State/PreferencesMemory.js";
import * as SelectionMemory from "../../State/SelectionMemory.js";
import { changeLanguage, language } from "../../i18n.js"

import HomeSerieConfig from '../../Config/HomeSerieConfig.js';
import SerieConfig from '../../Config/SerieConfig.js';
import refreshCardList from "../../CardListScreen/CardListHelper.js";

function toggleCollection(state = initialState, action) {
  if (action.type == "LOAD_FROM_MEMORY") {
    changeLanguage(action.value.language);
    return {
      ...state,
      collections: action.value.collections,
      selectedSeries: action.value.selectedSeries,
      unselectedRarities: action.value.unselectedRarities,
      display: action.value.display,
      selection: action.value.selection,
      seriesToDisplay: filterSelectedSeriesOnly(HomeSerieConfig, action.value.selectedSeries, action.value.language),
      language: action.value.language,
      isLoaded: true
    }
  } else if (action.type == "ADD_CARD") {
    const collections = recomputeCollections(action.value.collectionName, action.value.card, state.collections);

    CollectionMemory.addCard(action.value.collectionName, collections[action.value.collectionName])

    return {
      ...state,
      collections: collections
    }
  } else if (action.type == "CHANGE_CONFIG") {
    SelectionMemory.setSelection(action.value.selection);
    SelectionMemory.setDisplay(action.value.display);
    SelectionMemory.setUnselectedRarities(action.value.unselectedRarities);

    return {
      ...state,
      selection: action.value.selection,
      display: action.value.display,
      unselectedRarities: action.value.unselectedRarities
    }
  } else if (action.type == "SWITCH_LONG_SELECTION_MODE") {
    return {
      ...state,
      inLongSelectionMode: !state.inLongSelectionMode
    }
  } else if (action.type == "SET_SERIES") {
    let series = Object.assign({}, state.selectedSeries);

    if (series[action.value] != null) {
      series[action.value] = !series[action.value];
    } else {
      series[action.value] = true;
    }

    PreferencesMemory.setSerieSelection(series);

    return {
      ...state,
      selectedSeries: series,
      seriesToDisplay: filterSelectedSeriesOnly(HomeSerieConfig, series, state.language),
    }
  } else if (action.type == "CHANGE_LANGUAGE") {
    changeLanguage(action.value);
    PreferencesMemory.setLanguage(action.value);
    return {
      ...state,
      language: action.value,
      seriesToDisplay: filterSelectedSeriesOnly(HomeSerieConfig, state.selectedSeries, action.value)
    }
  }

  return state;
}

function recomputeCollections(collectionName, card, oldCollections) {
  let collections = Object.assign({}, oldCollections);

  if (collections[collectionName] != null && collections[collectionName][card.id] != null) {
    delete collections[collectionName][card.id]
  } else {
    if (collections[collectionName] == null) {
      collections[collectionName] = {};
    }
    collections[collectionName][card.id] = true;
  }

  return collections;
}

function filterSelectedSeriesOnly(allSeries, selectedSeries, lang) { // TODO: No need to recompute everything
  var result = [];

  allSeries.forEach((value, index) => {
    var newData = value.data.filter(key => selectedSeries[key]);

    if (newData.length != 0) {
      result.push({
        title: language(lang, value),
        data: newData
      });
    }
  });

  return result;
}

export default toggleCollection