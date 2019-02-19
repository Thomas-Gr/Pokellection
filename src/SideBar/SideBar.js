import {
  Body,
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Text
} from 'native-base';

import { Image } from 'react-native';
import React from "react";

const routes = [
  { name: "Series", link: "Home", icon: "cards", type: "MaterialCommunityIcons"},
  { name: "Researchs", link: "ResearchsScreen", icon: "search"},
  { name: "Series selection", link: "SerieSelection", icon: "cog"},
  { name: "Statistics", link: "NOPE", icon: "md-stats", type: "Ionicons"},
  { name: "About", link: "About", icon: "question", type: "FontAwesome"}]

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
            }}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem icon
                  button
                  onPress={() => this.props.navigation.navigate(data.link)}
                >
                  <Left>
                    {data.icon != null ? (<Icon name={data.icon} type={data.type} style={{width:25}}/>) : null}
                  </Left>
                  <Body>
                    <Text>{data.name}</Text>
                  </Body>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
