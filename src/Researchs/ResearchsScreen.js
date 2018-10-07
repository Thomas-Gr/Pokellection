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

export default class ResearchsScreen extends Component {
  constructor() {
    super();
    this.state = {launched: false};
  }

  componentWillMount() {
    PreferencesMemory.getSerieSelection((selectedSeries) => {
        CollectionMemory.getCollection(selectedSeries, (collections) => {
            var seriesToDisplay = this.merge(
              this.filterSelectedSeriesOnly(HomeSerieConfig, selectedSeries),
              collections);
            this.setState({launched: true, seriesToDisplay: seriesToDisplay});
          });
    });
  }

  merge(filteredSerie, collections) {
    return filteredSerie
        .map(key => ({
          title: key,
          data: [{cards: collections[key] == undefined ? {} : collections[key], name: key}]
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
    <ListItem style={{marginLeft:0, paddingLeft:0}}>
      <CardListScreen
          isEmbedded={true}
          collection={item.cards}
          serieName={item.name}
          />
    </ListItem>
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
          <MyHeader {...this.props}/>
          <Content>
          <SectionList
             sections={this.state.seriesToDisplay}
             keyExtractor={item => item}
             renderItem={this._renderItem}
             numColumns={1}
             initialNumToRender={12}
             renderSectionHeader={this._renderSectionHeader}
             />
          </Content>
          <AdBanner />
        </Container>
      );
    }
  }
}
