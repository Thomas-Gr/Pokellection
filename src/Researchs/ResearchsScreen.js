import React, { Component } from 'react';
import MyHeader from "../UtilityScreens/MyHeader.js";
import AdBanner from "../UtilityScreens/AdBanner.js";
import { Container, Content, List, ListItem, Text, Left, Body, Right } from 'native-base';
import { AsyncStorage, SectionList, Image } from "react-native";

import * as CollectionMemory from "../State/CollectionMemory.js";
import * as SelectionMemory from "../State/SelectionMemory.js";
import * as PreferencesMemory from "../State/PreferencesMemory.js";

import CardListScreen from '../CardListScreen/CardListScreen.js';
import SerieConfig from '../Config/SerieConfig.js';
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';
import CardListConfigurationScreen from '../CardListScreen/CardListConfigurationScreen.js';
import CardInformationScreen from "../CardListScreen/CardInformationScreen.js";

export default class ResearchsScreen extends Component {
  constructor() {
    super();
    this.state = {
      launched: false,
      listConfigurationVisible: false,
      cardInformationVisible: false,
      selectedCard: null,
      selectedSerie: null,
      hasSelectedCard: false
    };

    this.changeSelection = this.changeSelection.bind(this);
    this.showConfigurationPanel = this.showConfigurationPanel.bind(this);
    this.hideConfigurationPanel = this.hideConfigurationPanel.bind(this);
    this.addCard = this.addCard.bind(this);
    this.showCardInformation = this.showCardInformation.bind(this);
    this.hideCardInformation = this.hideCardInformation.bind(this);
  }

  componentWillMount() {
    SelectionMemory.getUnselectedRarities((unselectedRarities) => {
      SelectionMemory.getDisplay((display) => {
        PreferencesMemory.getSerieSelection((selectedSeries) => {
          CollectionMemory.getCollection(selectedSeries, (collections) => {
            var seriesToDisplay = this.merge(
              this.filterSelectedSeriesOnly(HomeSerieConfig, selectedSeries),
              collections,
              'miss',
              display,
              unselectedRarities);

            this.setState({
              seriesToDisplay: seriesToDisplay,
              selection: 'miss',
              display: display,
              unselectedRarities: unselectedRarities,
              launched: true,
              collections: collections
            });
          });
        });
      });
    });
  }

  showConfigurationPanel() {
    this.setState({listConfigurationVisible: true});
  }

  hideConfigurationPanel() {
    this.setState({listConfigurationVisible: false});
  }

  changeSelection(selection: string, display: string, unselectedRarities: string[]) {
    SelectionMemory.setSelection(selection);
    SelectionMemory.setDisplay(display);
    SelectionMemory.setUnselectedRarities(unselectedRarities);

    let series = Object.assign([], this.state.seriesToDisplay)

    series = series.map(item => ({
        title: item.title,
        data: [{
          name: item.data[0].name,
          selection: selection,
          display: display,
          unselectedRarities: unselectedRarities}],
        selection: selection,
        display: display,
        unselectedRarities: unselectedRarities
      }));

      this.setState({
        selection: selection,
        display: display,
        unselectedRarities: unselectedRarities,
        seriesToDisplay: series
      });
  }

  merge(filteredSerie, collections, selection, display, unselectedRarities) {
    return filteredSerie
        .map(key => ({
          title: key,
          data: [{
            name: key,
            selection: selection,
            display: display,
            unselectedRarities: unselectedRarities}]
        }))
        .filter(obj => collections[obj.data[0].name] == undefined ||
            Object.keys(collections[obj.data[0].name]).length !=
                Object.keys(SerieConfig[obj.title].definition.cards).length);
  }

  filterSelectedSeriesOnly(allSeries, selectedSeries) {
    return [].concat(...allSeries.map(x => x.data, allSeries)).filter(key => selectedSeries[key])
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
      () => CollectionMemory.addCard(collectionName, collections[collectionName]));
  }

  _renderItem = ({item}) => (
      <CardListScreen
          isEmbedded={true}
          collection={this.state.collections[item.name]}
          serieName={item.name}
          selection={item.selection}
          display={item.display}
          unselectedRarities={item.unselectedRarities}
          selectCard={(card) => this.showCardInformation(item.name, card)}
          addCard={(name, card) => this.addCard(name, card)}
          />
  )

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{section.title}</Text></ListItem>
  )

  hideCardInformation() {
    this.setState({cardInformationVisible: false, hasSelectedCard: false});
  }

  showCardInformation(serieName, card) {
    this.setState({
      cardInformationVisible: true,
      selectedCard: card,
      selectedSerie: serieName,
      hasSelectedCard: this.state.collections[serieName] != null
          && this.state.collections[serieName][card.id] != null
    });
  }

  render() {
    if (!this.state.launched) {
      return (
        <Container>
          <Content/>
        </Container>
      );
    } else {
      return (
        <Container>
          <MyHeader {...this.props} selectionFunction={this.showConfigurationPanel}/>
          <Content>
            <SectionList
               sections={this.state.seriesToDisplay}
               keyExtractor={item => item}
               renderItem={this._renderItem}
               numColumns={1}
               initialNumToRender={1}
               renderSectionHeader={this._renderSectionHeader}
               />

             <CardInformationScreen
               serieName={this.state.selectedSerie}
               visible={this.state.cardInformationVisible}
               hide={this.hideCardInformation}
               hasSelectedCard={this.state.hasSelectedCard}
               selectedCard={this.state.selectedCard}
               addCard={(name, card) => this.addCard(name, card)}/>

             <CardListConfigurationScreen
                 selection={this.state.selection}
                 display={this.state.display}
                 unselectedRarities={this.state.unselectedRarities}
                 visible={this.state.listConfigurationVisible}
                 hide={this.hideConfigurationPanel}
                 research='miss'
                 changeSelection={(selection, display, unselectedRarities) => this.changeSelection(selection, display, unselectedRarities)}/>
          </Content>
          <AdBanner />
        </Container>
      );
    }
  }
}
