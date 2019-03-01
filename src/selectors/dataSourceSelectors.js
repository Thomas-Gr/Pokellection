import { createSelector } from 'reselect'

import SerieConfig from '../Config/SerieConfig.js';
import refreshCardList from "../CardListScreen/CardListHelper.js";

const getCards = (state, ownProps) => SerieConfig[ownProps.serieName].definition.cards
const getCollection = (state, ownProps) => state.collections[ownProps.serieName]
const getSelection = (state, ownProps) => ownProps.forcedSelection || state.selection
const getSelectedSeries = (state) => state.unselectedRarities
const getUnumberedSorting = (state) => state.unumberedSorting

const makeGetDisplayedCards = () => {
  return createSelector(
    [getCards, getCollection, getSelection, getSelectedSeries, getUnumberedSorting],
    (cards, collection, selection, selectedSeries, unumberedSorting) => refreshCardList(cards, collection, selection, selectedSeries, unumberedSorting)
  )
}

export default makeGetDisplayedCards
