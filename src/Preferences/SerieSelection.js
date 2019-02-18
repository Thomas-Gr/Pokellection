import React, { Component } from 'react';
import MyHeader from "../UtilityScreens/MyHeader.js";
import AdBanner from "../UtilityScreens/AdBanner.js";
import { Container, Content, List, ListItem, CheckBox, Text, Left, Body, Right } from 'native-base';
import { AsyncStorage, SectionList, Image } from "react-native";
import { connect } from 'react-redux'

import * as PreferencesMemory from "../State/PreferencesMemory.js";

import SerieConfig from '../Config/SerieConfig.js';
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';

class SerieSelection extends Component {
  updateSerie(item) {
    this.props.dispatch({ type: "SET_SERIES", value: item })
  }

  _renderItem = ({item}) => (
    <ListItem>
      <Left style={{flex:0.15}}>
        {
          SerieConfig[item].definition.image != ""
            ? (<Image source={SeriesLogos[SerieConfig[item].definition.image]} />)
            : (null)
        }
      </Left>
      <Body style={{flex:0.7}}>
        <Text style={{fontSize:15}}>
          {item}
        </Text>
      </Body>
      <Right style={{flex:0.15}}>
        <CheckBox checked={this.props.selectedSeries[item] == true} onPress={() => this.updateSerie(item)}/>
      </Right>
    </ListItem>
  )

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{section.title}</Text></ListItem>
  )

  render() {
    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
        <SectionList
           sections={HomeSerieConfig}
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

const mapStateToProps = (state) => {
  return {
    selectedSeries: state.selectedSeries
  }
}

export default connect(mapStateToProps)(SerieSelection)
