import React, { Component } from 'react';
import MyHeader from "../UtilityScreens/MyHeader.js";
import AdBanner from "../UtilityScreens/AdBanner.js";
import { Container, Content, List, ListItem, Text, Left, Body, Right } from 'native-base';
import { AsyncStorage, SectionList, Image, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'

import * as CollectionMemory from "../State/CollectionMemory.js";
import * as SelectionMemory from "../State/SelectionMemory.js";
import * as PreferencesMemory from "../State/PreferencesMemory.js";

import SerieConfig from '../Config/SerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.fetchAndUpdateState = this.fetchAndUpdateState.bind(this);

    this.fetchAndUpdateState();
  }

  fetchAndUpdateState() {
    SelectionMemory.getSelection((selection) => {
      SelectionMemory.getDisplay((display) => {
        SelectionMemory.getUnselectedRarities((unselectedRarities) => {
          PreferencesMemory.getSerieSelection((selectedSeries) => {
            CollectionMemory.getCollection(selectedSeries, (collections) => {
                if (!this.props.isLoaded) {
                  this.props.dispatch({
                    type: "LOAD_FROM_MEMORY",
                    value: {
                      collections: collections,
                      selectedSeries: selectedSeries,
                      unselectedRarities: unselectedRarities,
                      display: display,
                      selection: selection,
                  }});
                }
            });
          });
        });
      });
    });
  }

  _renderItem = ({item}) => (
    <ListItem style={{backgroundColor:"transparent"}} onPress={() => this.props.navigation.navigate(
        'CardListScreen',
        {
          serieName: item
        })}>
      <Left style={{flex:0.15}}>
        {
          SerieConfig[item].definition.image != ""
            ? (<Image source={SeriesLogos[SerieConfig[item].definition.image]} />)
            : (null)
        }
      </Left>
      <Body style={{flex:0.67}}>
        <Text style={{fontSize: 15}}>
          {item}
        </Text>
      </Body>
      <Right style={{flex: 0.17}}>
        <Text note>
          {this.props.collections[item] == null ? 0 : Object.keys(this.props.collections[item]).length}
          /{Object.keys(SerieConfig[item].definition.cards).length}
        </Text>
      </Right>
    </ListItem>
  )

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{section.title}</Text></ListItem>
  )

  render() {
    if (!this.props.isLoaded) {
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
             sections={this.props.seriesToDisplay}
             keyExtractor={item => item}
             renderItem={this._renderItem}
             numColumns={1}
             initialNumToRender={12}
             renderSectionHeader={this._renderSectionHeader}
             />
          </Content>
          <AdBanner/>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    seriesToDisplay: state.seriesToDisplay,
    collections: state.collections,
    isLoaded: state.isLoaded,
  }
}

export default connect(mapStateToProps)(HomeScreen)
