import * as React from 'react';
import { Text, Container } from "native-base";
import { View, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import AdBanner from "../UtilityScreens/AdBanner.js";
import MyHeader from "../UtilityScreens/MyHeader.js";

import CardListScreen from "./CardListScreen.js";
import CardInformationScreen from "./CardInformationScreen.js";
import CardListConfigurationScreen from "./CardListConfigurationScreen.js";

import * as SelectionMemory from "../State/SelectionMemory.js";
import * as CollectionMemory from "../State/CollectionMemory.js";

export default class CardListTabScreen extends React.Component {
  constructor(props) {
    super(props);

    const series = [].concat(...props.navigation.state.params.seriesToDisplay.map(a => a.data))
    const firstIndex = series.indexOf(props.navigation.state.params.serieName);

    this.state = {
      index: firstIndex,
      routes: series.map(a => ({key: a})),
      collections: Object.assign({}, props.navigation.state.params.collections),
      selection: props.navigation.state.params.selection,
      display: props.navigation.state.params.display,
      unselectedRarities: props.navigation.state.params.unselectedRarities,
      seriesToDisplay: props.navigation.state.params.seriesToDisplay,
      updateData: props.navigation.state.params.updateData,
      listConfigurationVisible: false,
      cardInformationVisible: false,
      selectedCard: null,
      hasSelectedCard: false
    };

    this.changeSelection = this.changeSelection.bind(this);
    this.showConfigurationPanel = this.showConfigurationPanel.bind(this);
    this.hideConfigurationPanel = this.hideConfigurationPanel.bind(this);
    this.addCard = this.addCard.bind(this);
    this.showCardInformation = this.showCardInformation.bind(this);
    this.hideCardInformation = this.hideCardInformation.bind(this);
  }

  showConfigurationPanel() {
    this.setState({listConfigurationVisible: true});
  }

  hideConfigurationPanel() {
    this.setState({listConfigurationVisible: false});
  }

  hideCardInformation() {
    this.setState({cardInformationVisible: false, hasSelectedCard: false});
  }

  showCardInformation(card) {
    this.setState({
      cardInformationVisible: true,
      selectedCard: card,
      hasSelectedCard: this.state.collections[this.state.routes[this.state.index].key] != null
          && this.state.collections[this.state.routes[this.state.index].key][card.id] != null
    });
  }

  changeSelection(selection: string, display: string, unselectedRarities: string[]) {
    SelectionMemory.setSelection(selection);
    SelectionMemory.setDisplay(display);
    SelectionMemory.setUnselectedRarities(unselectedRarities);

    this.setState({
      selection: selection,
      display: display,
      unselectedRarities: unselectedRarities},
      () => this.state.updateData(
        this.state.selection,
        this.state.display,
        this.state.unselectedRarities,
        this.state.collections));
  }

  addCard(collectionName, card) {
    let collections = Object.assign({}, this.state.collections);

    if (collections[collectionName] != null && collections[collectionName][card.id] != null) {
      delete collections[collectionName][card.id]
    } else {
      if (collections[collectionName] == null) {
        collections[collectionName] = {};
      }
      collections[collectionName][card.id] = true;
    }

    this.setState(
      {collections},
      () => {
        CollectionMemory.addCard(collectionName, collections[collectionName]);
        this.state.updateData(this.state.selection, this.state.display, this.state.unselectedRarities, this.state.collections);
      });
  }

  _renderTabBar = route => null;
  _handleIndexChange = index => this.setState({ index: index });

  _renderScene = ({ route }) => {
    if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 1) {
      return <View />;
    }

    return <CardListScreen
      collection={this.state.collections[route.key]}
      serieName={route.key}
      selection={this.state.selection}
      display={this.state.display}
      unselectedRarities={this.state.unselectedRarities}
      addCard={(name, card) => this.addCard(name, card)}
      selectCard={(card) => this.showCardInformation(card)}
      />;
  };

  render() {
    return (
      <Container>
        <MyHeader {...this.props} title={this.state.routes[this.state.index].key} selectionFunction={this.showConfigurationPanel}/>
          <CardListConfigurationScreen
            selection={this.state.selection}
            display={this.state.display}
            unselectedRarities={this.state.unselectedRarities}
            visible={this.state.listConfigurationVisible}
            hide={this.hideConfigurationPanel}
            changeSelection={(selection, display, unselectedRarities) => this.changeSelection(selection, display, unselectedRarities)}/>

          <CardInformationScreen
            serieName={this.state.routes[this.state.index].key}
            visible={this.state.cardInformationVisible}
            hide={this.hideCardInformation}
            hasSelectedCard={this.state.hasSelectedCard}
            selectedCard={this.state.selectedCard}
            addCard={(name, card) => this.addCard(name, card)}/>

          <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            onIndexChange={this._handleIndexChange}
            renderTabBar={(route) => null}
            initialLayout={{ width: Dimensions.get('window').width }}
          />
      <AdBanner/>
    </Container>
    );
  }
}
