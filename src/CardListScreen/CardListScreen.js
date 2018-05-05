import React from "react";
import { Image, FlatList } from "react-native";
import { Text, Container, Body, Content, Picker, Form } from "native-base";

import MyHeader from "../UtilityScreens/MyHeader.js";
import GymChallenge from "../Config/ImageConfig/GymChallenge.js";
import CardItem from "./CardItem.js";

import CollectionMemory from "../State/CollectionMemory.js"
import SerieConfig from '../Config/SerieConfig.js';

export default class CardListScreen extends React.Component {
  constructor(props) {
    super(props);

    const serie = SerieConfig[props.navigation.state.params.serieName].definition;
    const collection = Object.assign({}, props.navigation.state.params.collection);

    this.state = {
      name: serie.name,
      cards: serie.cards,
      dataSource: this.refreshCardList(serie.cards, collection, undefined),
      selection: undefined,
      collection: collection,
    };

    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.updateCardList = this.updateCardList.bind(this);
  }

  onSelectionChange(value: string) {
    this.setState(
      {selection: value},
      () => this.updateCardList());
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
        CollectionMemory.addCard(collectionName, JSON.stringify(collection));

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
      "ENERGY": 9
    };

    const rarityOrder = {
      "COMMON": 1,
      "UNCOMMON": 2,
      "RARE": 3,
      "RARE_HOLO": 3,
      "SUPER_RARE": 5,
      "ULTRA_RARE_UNCOMMON": 6,
      "NONE": 7
    };

    return Object.values(cards)
      .sort((a, b) => {
        const cardNumberDiff = parseInt(a.number) - parseInt(b.number);
        if (cardNumberDiff != 0) return cardNumberDiff;

        const typeDiff = typeOrder[a.type] - typeOrder[b.type];
        if (typeDiff != 0) return typeDiff;

        const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
        if (rarityDiff != 0) return rarityDiff;

        const pokemonNumberDiff = a.pokemonNumber - b.pokemonNumber;
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
    addCard={(a, b) => this.addCard(a, b)}/>)

  render() {
    return (
      <Container>
        <MyHeader {...this.props} title={this.state.name}/>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              selectedValue={this.state.selection}
              onValueChange={this.onSelectionChange.bind(this)}
            >
              <Picker.Item label="Toutes les cartes" value="all" />
              <Picker.Item label="Cartes manquantes" value="miss" />
              <Picker.Item label="Mes cartes" value="got" />
            </Picker>
          </Form>

          <FlatList
             data={this.state.dataSource}
             keyExtractor={item => item.id}
             numColumns={3}
             renderItem={this._renderItem}/>
        </Content>
      </Container>
    );
  }
}
