import React, { Component } from 'react';
import MyHeader from "../UtilityScreens/MyHeader.js";
import { Container, Content, List, ListItem, Text } from 'native-base';
import { AsyncStorage, FlatList } from "react-native";

import CollectionMemory from "../State/CollectionMemory.js";
import SerieConfig from '../Config/SerieConfig.js';

export default class HomeScreen extends Component {
  constructor(){
    super();
    this.state = {launched: false};
  }

  componentWillMount() {
    CollectionMemory.getCollection((collections) =>
        this.setState({launched: true, collections: collections}));
  }

  _renderItem = ({item}) => (
    <ListItem>
      <Text onPress={() => this.props.navigation.navigate(
          'CardListScreen',
          {serieName: item, collection: this.state.collections[item]})}>
        {item}
      </Text>
    </ListItem>
  )

  render() {
    if (!this.state.launched) {
      return (
        <Container>
          <Content>
            <Text>Loading ...</Text>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <MyHeader {...this.props}/>
          <Content>
          <FlatList
             data={Object.keys(SerieConfig)}
             keyExtractor={item => item}
             renderItem={this._renderItem}/>
          </Content>
        </Container>
      );
    }
  }
}
