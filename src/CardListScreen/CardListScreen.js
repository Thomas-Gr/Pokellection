import React from "react";
import { Image, FlatList, View } from "react-native";
import { Text, Container, Body, Content, Picker, Form } from "native-base";

import MyHeader from "../UtilityScreens/MyHeader.js";
import AdBanner from "../UtilityScreens/AdBanner.js";
import CardItem from "./CardItem.js";
import CardInformationScreen from "./CardInformationScreen.js";
import CardListConfigurationScreen from "./CardListConfigurationScreen.js";

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
    var display;

    if (props.isEmbedded) {
      serieName = props.serieName;
      collection = props.collection;
      selection = 'miss';
      display = 'pictures';
    } else {
      serieName = props.navigation.state.params.serieName;
      collection = Object.assign({}, props.navigation.state.params.collection);
      selection = props.navigation.state.params.selection;
      display = props.navigation.state.params.display;
    }
    var serie = SerieConfig[serieName].definition;

    this.state = {
      name: serie.name,
      cards: serie.cards,
      dataSource: refreshCardList(serie.cards, collection, selection),
      selection: selection,
      display: display,
      showNumbers: serie.showNumbers,
      collection: collection,
      isEmbedded: props.isEmbedded,
      cardInformationVisible: false,
      listConfigurationVisible: false,
      selectedCard: undefined,
      inLongSelectionMode: false
    };

    this.updateCardList = this.updateCardList.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.updateSelectedCard = this.updateSelectedCard.bind(this);
    this.hideCardInformation = this.hideCardInformation.bind(this);
    this.showConfigurationPanel = this.showConfigurationPanel.bind(this);
    this.hideConfiguration = this.hideConfiguration.bind(this);
    this.switchLongSelectionMode = this.switchLongSelectionMode.bind(this);
  }

  changeSelection(selection: string, display: string) {
    SelectionMemory.setSelection(selection);
    SelectionMemory.setDisplay(display);

    this.setState(
      {selection: selection, display: display},
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

  hideCardInformation() {
    this.setState({cardInformationVisible: false});
  }

  showConfigurationPanel() {
    this.setState({listConfigurationVisible: true});
  }

  hideConfiguration() {
    this.setState({listConfigurationVisible: false});
  }

  switchLongSelectionMode() {
    this.setState({inLongSelectionMode: !this.state.inLongSelectionMode}, () => this.updateCardList());
  }

  updateSelectedCard(card) {
    this.setState({
      cardInformationVisible: true,
      selectedCard: card,
      hasSelectedCard: this.state.collection[card.id] != null
    });
  }

  _renderItem = ({item}) => (<CardItem
    display={this.state.display}
    collectionName={this.state.name}
    item={item}
    data={this.state.cards[item.id.toString()]}
    showNumbers={this.state.showNumbers}
    inLongSelectionMode={this.state.inLongSelectionMode}
    switchLongSelectionMode={() => this.switchLongSelectionMode()}
    addCard={(a) => this.addCard(this.state.name, this.state.cards[item.id.toString()])}
    selectCard={() => this.updateSelectedCard(this.state.cards[item.id.toString()])}/>)

  render() {
    const cardsList = this.state.display == 'list'
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

    if (this.state.isEmbedded) {
      return cardsList;
    } else {
      return (
        <Container>
          <MyHeader {...this.props} title={this.state.name} selection={this.state.selection} selectionFunction={this.showConfigurationPanel}/>
          <Content>
            <CardInformationScreen
                serieName={this.state.name}
                selectedCard={this.state.selectedCard}
                visible={this.state.cardInformationVisible}
                hide={this.hideCardInformation}
                hasSelectedCard={this.state.hasSelectedCard}
                addCard={() => this.addCard(this.state.name, this.state.cards[this.state.selectedCard.id.toString()])}/>

            <CardListConfigurationScreen
                selection={this.state.selection}
                display={this.state.display}
                visible={this.state.listConfigurationVisible}
                hide={this.hideConfiguration}
                changeSelection={(selection, display) => this.changeSelection(selection, display)}/>

            {cardsList}
          </Content>
          <AdBanner/>
        </Container>
      );
    }

  }
}
