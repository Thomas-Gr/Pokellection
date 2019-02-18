import * as React from 'react';
import { Text, Container } from "native-base";
import { View, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { connect } from 'react-redux'

import AdBanner from "../UtilityScreens/AdBanner.js";
import MyHeader from "../UtilityScreens/MyHeader.js";

import CardListScreen from "./CardListScreen.js";
import CardInformationScreen from "./CardInformationScreen.js";
import CardListConfigurationScreen from "./CardListConfigurationScreen.js";

import * as SelectionMemory from "../State/SelectionMemory.js";
import * as CollectionMemory from "../State/CollectionMemory.js";

class CardListTabScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const series = [].concat(...props.seriesToDisplay.map(a => a.data))

    const firstIndex = series.indexOf(props.navigation.state.params.serieName);

    this.state = {
      index: firstIndex,
      routes: series.map(a => ({key: a})),
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
      hasSelectedCard: this.props.collections[this.state.routes[this.state.index].key] != null
          && this.props.collections[this.state.routes[this.state.index].key][card.id] != null
    });
  }

  changeSelection(selection: string, display: string, unselectedRarities: string[]) {
    this.props.dispatch({ type: "CHANGE_CONFIG", value: {selection: selection, display: display, unselectedRarities: unselectedRarities} })
  }

  addCard(collectionName, card) {
    this.props.dispatch({ type: "ADD_CARD", value: {collectionName: collectionName, card: card} })
  }

  _renderTabBar = route => null;
  _handleIndexChange = index => this.setState({ index: index });

  _renderScene = ({ route }) => {
    if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 1) {
      return <View />;
    }

    return <CardListScreen
      serieName={route.key}
      selectCard={(card) => this.showCardInformation(card)}
      addCard={(name, card) => this.addCard(name, card)}
      />;
  };

  render() {
    return (
      <Container>
        <MyHeader {...this.props} title={this.state.routes[this.state.index].key} selectionFunction={this.showConfigurationPanel}/>
          <CardListConfigurationScreen
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

const mapStateToProps = (state) => {
  return {
    seriesToDisplay: state.seriesToDisplay,
    collections: state.collections
  }
}

export default connect(mapStateToProps)(CardListTabScreen)
