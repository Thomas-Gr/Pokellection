import React from "react";
import { Image, FlatList, View } from "react-native";
import { Text, Container, Body, Content, Picker, Form } from "native-base";

import CardItem from "./CardItem.js";

import refreshCardList from "./CardListHelper.js";

import SerieConfig from '../Config/SerieConfig.js';

export default class CardListScreen extends React.Component {
  constructor(props) {
    super(props);

    var serie = SerieConfig[props.serieName].definition;
    var collection = Object.assign({}, props.collection);

    this.state = {
      name: serie.name,
      cards: serie.cards,
      dataSource: refreshCardList(serie.cards, collection, props.selection, props.unselectedRarities),
      selection: props.selection,
      display: props.display,
      unselectedRarities: props.unselectedRarities,
      showNumbers: serie.showNumbers,
      collection: collection,
      inLongSelectionMode: false
    };

    this.updateCardList = this.updateCardList.bind(this);
    this.switchLongSelectionMode = this.switchLongSelectionMode.bind(this);
  }

  componentDidUpdate(prevProps) {
    var collection = Object.assign({}, this.props.collection);

    if (prevProps.selection != this.props.selection
      || prevProps.display != this.props.display
      || JSON.stringify(this.state.collection) != JSON.stringify(collection)
      || prevProps.unselectedRarities != this.props.unselectedRarities) {
      this.setState({
        selection: this.props.selection,
        display: this.props.display,
        unselectedRarities: this.props.unselectedRarities,
        collection: Object.assign({}, this.props.collection)
      }, () => this.updateCardList());
    }
  }

  updateCardList() {
    this.setState({dataSource: refreshCardList(
      this.state.cards,
      this.state.collection,
      this.state.selection,
      this.state.unselectedRarities)});
  }

  switchLongSelectionMode() {
    this.setState({inLongSelectionMode: !this.state.inLongSelectionMode}, () => this.updateCardList());
  }

  _renderItem = ({item}) => (<CardItem
    display={this.state.display}
    collectionName={this.state.name}
    item={item}
    data={this.state.cards[item.id.toString()]}
    showNumbers={this.state.showNumbers}
    inLongSelectionMode={this.state.inLongSelectionMode}
    switchLongSelectionMode={() => this.switchLongSelectionMode()}
    addCard={this.props.addCard}
    selectCard={this.props.selectCard}/>)

  render() {
    return this.state.display == 'list'
        ? <View><FlatList
           data={this.state.dataSource}
           keyExtractor={item => 'list' + item.id.toString()}
           initialNumToRender={15}
           renderItem={this._renderItem}/></View>
        : <FlatList
           data={this.state.dataSource}
           keyExtractor={item => 'pictures' + item.id.toString()}
           numColumns={3}
           initialNumToRender={12}
           renderItem={this._renderItem}/>
  }
}
