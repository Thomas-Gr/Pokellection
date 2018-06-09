import React, { Component } from 'react';
import MyHeader from "../UtilityScreens/MyHeader.js";
import { Container, Content, List, ListItem, Text, Left, Body, Right } from 'native-base';
import { AsyncStorage, SectionList, Image } from "react-native";

import * as CollectionMemory from "../State/CollectionMemory.js";
import * as SelectionMemory from "../State/SelectionMemory.js";

import SerieConfig from '../Config/SerieConfig.js';
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {launched: false};
  }

  componentWillMount() {
    SelectionMemory.getSelection((selection) =>
        this.setState({selection: selection}));

    CollectionMemory.getCollection((collections) =>
        this.setState({launched: true, collections: collections}));
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
        <Text style={{fontSize:15}} onPress={() => this.props.navigation.navigate(
            'CardListScreen',
            {serieName: item, selection: this.state.selection, collection: this.state.collections[item]})}>
          {item}
        </Text>
      </Body>
      <Right style={{flex:0.15}}>
        <Text note>
          {this.state.collections[item] == null ? 0 : Object.keys(this.state.collections[item]).length}
          /{Object.keys(SerieConfig[item].definition.cards).length}
        </Text>
      </Right>
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
             sections={HomeSerieConfig}
             keyExtractor={item => item}
             renderItem={this._renderItem}
             numColumns={1}
             initialNumToRender={12}
             renderSectionHeader={this._renderSectionHeader}
             />
          </Content>
        </Container>
      );
    }
  }
}
