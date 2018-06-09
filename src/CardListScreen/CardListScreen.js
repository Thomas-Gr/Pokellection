import React from "react";
import { Image, FlatList } from "react-native";
import { Text, Container, Body, Content, Picker, Form } from "native-base";

import MyHeader from "../UtilityScreens/MyHeader.js";
import GymChallenge from "../Config/ImageConfig/GymChallenge.js";
import CardItem from "./CardItem.js";

import * as CollectionMemory from "../State/CollectionMemory.js";
import * as SelectionMemory from "../State/SelectionMemory.js";
import SerieConfig from '../Config/SerieConfig.js';

export default class CardListScreen extends React.Component {
  constructor(props) {
    super(props);

    const serie = SerieConfig[props.navigation.state.params.serieName].definition;
    const collection = Object.assign({}, props.navigation.state.params.collection);

    this.state = {
      name: serie.name,
      cards: serie.cards,
      dataSource: this.refreshCardList(serie.cards, collection, props.navigation.state.params.selection),
      selection: props.navigation.state.params.selection,
      showNumbers: serie.showNumbers,
      collection: collection,
    };

    this.updateCardList = this.updateCardList.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
  }

  changeSelection(value: string) {
    SelectionMemory.setSelection(value);

    this.setState(
      {selection: value},
      () => this.updateCardList());
  }

  onChangeSelection() {
    if (this.state.selection == 'got') {
      this.changeSelection('miss');
    } else if (this.state.selection == 'miss') {
      this.changeSelection('all');
    } else {
      this.changeSelection('got');
    }
  }

  addCard(collectionName, card) {
    let collection = Object.assign({}, this.state.collection);

    if (collection[card.id] != null) {
      delete collection[card.id]
    } else {
      collection[card.id] = true;
    }

    this.setState(
      {collection},
      () => {
        CollectionMemory.addCard(collectionName, collection);

        this.updateCardList();
      });
  }

  refreshCardList(cards, collection, selection) {
    // TODO: Move this somewhere else
    const typeOrder = {
      "GRASS": 1,
      "FIRE": 2,
      "WATER": 3,
      "LIGHTNING": 4,
      "PSYCHIC": 5,
      "FIGHTING": 6,
      "COLORLESS": 7,
      "TRAINER": 8,
      "EXTRA_RULE": 9,
      "PASS_CARD": 10,
      "ARTWORK": 11,
      "DECK_LIST": 12,
      "ENERGY": 13
    };

    const rarityOrder = {
      "COMMON": 1,
      "UNCOMMON": 2,
      "RARE": 3,
      "RARE_HOLO": 3,
      "SUPER_RARE": 5,
      "SUPER_RARE_HOLO": 6,
      "ULTRA_RARE_UNCOMMON": 7,
      "NONE": 8
    };

    return Object.values(cards)
      .sort((a, b) => {
        const cardNumberDiff = parseInt(a.number) - parseInt(b.number);
        if (cardNumberDiff != 0) return cardNumberDiff;

        const typeDiff = typeOrder[a.type] - typeOrder[b.type];
        if (typeDiff != 0) return typeDiff;

        const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
        if (rarityDiff != 0) return rarityDiff;

        const pokemonNumberDiff = parseInt(a.pokemonNumber) - parseInt(b.pokemonNumber);
        if (pokemonNumberDiff != 0) return pokemonNumberDiff;
      })
      .map(a => ({id: a.id, owned: collection[a.id] != null}))
      .filter(a => {
        if (selection == 'got') return a.owned;
        else if (selection == 'miss') return !a.owned;
        else return true;
      });
  }

  updateCardList() {
    this.setState({dataSource: this.refreshCardList(
      this.state.cards,
      this.state.collection,
      this.state.selection)});
  }

  _renderItem = ({item}) => (<CardItem
    collectionName={this.state.name}
    item={item}
    data={this.state.cards[item.id.toString()]}
    showNumbers={this.state.showNumbers}
    addCard={(a, b) => this.addCard(a, b)}/>)

  render() {
    return (
      <Container>
        <MyHeader {...this.props} title={this.state.name} selection={this.state.selection} selectionFunction={this.onChangeSelection}/>
        <Content>
          <FlatList
             data={this.state.dataSource}
             keyExtractor={item => item.id}
             numColumns={3}
             initialNumToRender={12}
             renderItem={this._renderItem}/>
        </Content>
      </Container>
    );
  }
}
