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

export default class ResearchsScreen extends Component {
  constructor() {
    super();
    this.state = {
      launched: false,
      listConfigurationVisible: false
    };

    this.changeSelection = this.changeSelection.bind(this);
    this.showConfigurationPanel = this.showConfigurationPanel.bind(this);
    this.hideConfigurationPanel = this.hideConfigurationPanel.bind(this);
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
              launched: true
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
          cards: item.data[0].cards,
          name: item.data[0].name,
          selection: selection,
          display: display,
          unselectedRarities: unselectedRarities}],
        selection: selection,
        display: display,
        unselectedRarities: unselectedRarities
      }));

    this.setState({seriesToDisplay: []}, () => { // Hack to force reloading...
        this.setState({
          selection: selection,
          display: display,
          unselectedRarities: unselectedRarities,
          seriesToDisplay: series
        });
      }
    );
  }

  merge(filteredSerie, collections, selection, display, unselectedRarities) {
    return filteredSerie
        .map(key => ({
          title: key,
          data: [{
            cards: collections[key] == undefined ? {} : collections[key],
            name: key,
            selection: selection,
            display: display,
            unselectedRarities: unselectedRarities}]
        }))
        .filter(obj => Object.keys(obj.data[0].cards).length !=
            Object.keys(SerieConfig[obj.title].definition.cards).length);
  }

  filterSelectedSeriesOnly(allSeries, selectedSeries) {
    const concat = (x, y) => x.concat(y);
    const flatMap = (f, xs) => xs.map(f).reduce(concat, []);

    return flatMap(x => x.data, allSeries).filter(key => selectedSeries[key])
  }

  _renderItem = ({item}) => (
      <CardListScreen
          isEmbedded={true}
          collection={item.cards}
          serieName={item.name}
          selection={item.selection}
          display={item.display}
          unselectedRarities={item.unselectedRarities}
          />
  )

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{section.title}</Text></ListItem>
  )

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
