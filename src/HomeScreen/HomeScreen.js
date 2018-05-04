import React, { Component } from 'react';
import MyHeader from "../UtilityScreens/MyHeader.js";
import { Container, Content, List, ListItem, Text } from 'native-base';
import { AsyncStorage } from "react-native";

import CollectionMemory from "../State/CollectionMemory.js";

export default class HomeScreen extends Component {
  constructor(){
    super();
    this.state = {launched: false};
  }

  componentWillMount() {
    CollectionMemory.getCollection((collections) =>
        this.setState({launched: true, collections: collections}));
  }

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
            <List>
              <ListItem itemHeader first>
                <Text>Dummy title</Text>
              </ListItem>
              <ListItem>
                <Text onPress={() => this.props.navigation.navigate('CardListScreen', {serieName: 'Gym Challenge', collection: this.state.collections['Gym Challenge']})}>Gym Challenge</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
  }
}
