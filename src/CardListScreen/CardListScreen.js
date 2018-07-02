import React from "react";
import { Image, FlatList } from "react-native";
import { Text, Container, Body, Content, Picker, Form } from "native-base";

import MyHeader from "../UtilityScreens/MyHeader.js";
import GymChallenge from "../Config/ImageConfig/GymChallenge.js";
import CardItem from "./CardItem.js";

import refreshCardList from "./CardListHelper.js";

import * as CollectionMemory from "../State/CollectionMemory.js";
import * as SelectionMemory from "../State/SelectionMemory.js";
import SerieConfig from '../Config/SerieConfig.js';

export default class CardListScreen extends React.Component {
  constructor(props) {
    super(props);

    var serieName;
    var collection;
    var cards;
    var selection;

    if (props.isEmbedded) {
      serieName = props.serieName;
      collection = props.collection;
      selection = 'miss';
    } else {
      serieName = props.navigation.state.params.serieName;
      collection = Object.assign({}, props.navigation.state.params.collection);
      selection = props.navigation.state.params.selection;
    }

    var serie = SerieConfig[serieName].definition;

    this.state = {
      name: serie.name,
      cards: serie.cards,
      dataSource: refreshCardList(serie.cards, collection, selection),
      selection: selection,
      showNumbers: serie.showNumbers,
      collection: collection,
      isEmbedded: props.isEmbedded
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

  updateCardList() {
    this.setState({dataSource: refreshCardList(
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
    if (this.state.isEmbedded) {
      return (
        <FlatList
           data={this.state.dataSource}
           keyExtractor={item => item.id}
           numColumns={3}
           initialNumToRender={12}
           renderItem={this._renderItem}/>
      );
    } else {
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
}
