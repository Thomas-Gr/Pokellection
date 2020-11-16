import * as CollectionMemory from "../State/CollectionMemory.js";
import * as PreferencesMemory from "../State/PreferencesMemory.js";
import * as SelectionMemory from "../State/SelectionMemory.js";
import { language } from "../i18n.js"
import {
  Body,
  Container,
  Content,
  Left,
  ListItem,
  Right,
  Text,
  Icon
} from 'native-base';
import { Image, SectionList } from 'react-native';
import React, { Component } from 'react';

import AdBanner from "../UtilityScreens/AdBanner.js";
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';
import { connect } from 'react-redux'

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.fetchAndUpdateState = this.fetchAndUpdateState.bind(this);

    this.fetchAndUpdateState();
  }

  fetchAndUpdateState() {
    if (!this.props.isLoaded) {
      SelectionMemory.getSelection((selection) => {
        SelectionMemory.getDisplay((display) => {
          SelectionMemory.getUnselectedRarities((unselectedRarities) => {
            PreferencesMemory.getSerieSelection((selectedSeries) => {
              PreferencesMemory.getLanguage((language) => {
                PreferencesMemory.getCardsLanguage((cardsLanguage) => {
                  PreferencesMemory.getSetsLanguage((setsLanguage) => {
                    PreferencesMemory.getUnumberedSorting((unumberedSorting) => {
                      CollectionMemory.getCollection(selectedSeries, (collections) => {
                        this.props.dispatch({
                          type: "LOAD_FROM_MEMORY",
                          value: {
                            collections: collections,
                            selectedSeries: selectedSeries,
                            unselectedRarities: unselectedRarities,
                            display: display,
                            selection: selection,
                            language: language,
                            cardsLanguage: cardsLanguage,
                            setsLanguage: setsLanguage,
                            unumberedSorting: unumberedSorting
                        }});
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    }
  }

  _renderItem = ({item}) => {
    const got = this.props.collections[item] == null ? 0 : Object.keys(this.props.collections[item]).length
    const total = Object.keys(SerieConfig[item].definition.cards).length

    const message = got == total
      ? <Icon name="check" type="FontAwesome" style={{color: '#aaa'}}/>
      : (got == 0
        ? <Icon name="remove" type="FontAwesome" style={{color: '#aaa'}}/>
        : got + '/' + total)
    return (
      <ListItem style={{backgroundColor:"transparent"}} onPress={() => this.props.navigation.navigate(
          'CardListScreen', { serieName: item })}>
        <Left style={{flex:0.15}}>
          {
            SerieConfig[item].definition.image != ""
              ? (<Image source={SeriesLogos[SerieConfig[item].definition.image]} />)
              : (null)
          }
        </Left>
        <Body style={{flex:0.67}}>
          <Text style={{fontSize: 15}}>
            {language(this.props.setsLanguage, SerieConfig[item].definition)}
          </Text>
        </Body>
        <Right style={{flex: 0.17}}>
          <Text note>
            {message}
          </Text>
        </Right>
      </ListItem>
    )
  }

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
          <SectionList
             sections={this.props.seriesToDisplay}
             keyExtractor={item => item}
             renderItem={this._renderItem}
             numColumns={1}
             initialNumToRender={12}
             renderSectionHeader={this._renderSectionHeader}
             />
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
    language: state.language,
    setsLanguage: state.setsLanguage
  }
}

export default connect(mapStateToProps)(HomeScreen)
