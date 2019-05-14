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
import { Col, Grid, Row } from "react-native-easy-grid";
import { Image, TouchableOpacity, View, Platform } from 'react-native';
import { string } from "../i18n.js"

import Flag from 'react-native-flags';
import React from "react";
import { connect } from 'react-redux'

const routes = Platform.OS === "ios"
  ? [ { name: "section.series", link: "Home", icon: "list"},
      { name: "section.researchs", link: "ResearchsScreen", icon: "search"},
      { name: "section.seriesSelection", link: "SerieSelectionScreen", icon: "cog"},
      { name: "section.preferences", link: "OptionsScreen", icon: "cog"},
    //  { name: "section.statistics", link: "NOPE", icon: "md-stats", type: "Ionicons"},
      { name: "section.about", link: "AboutScreen", icon: "question", type: "FontAwesome"}]

  : [ { name: "section.series", link: "Home", icon: "cards", type: "MaterialCommunityIcons"},
      { name: "section.researchs", link: "ResearchsScreen", icon: "search"},
      { name: "section.seriesSelection", link: "SerieSelectionScreen", icon: "cog"},
      { name: "section.preferences", link: "OptionsScreen", icon: "cog"},
    //  { name: "section.statistics", link: "NOPE", icon: "md-stats", type: "Ionicons"},
      { name: "section.about", link: "AboutScreen", icon: "question", type: "FontAwesome"}]

class SideBar extends React.Component {

  render() {
    const translatedRoutes = routes.map(route => {
      return {...route, translatedString: string(route.name)}
    });

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
            dataArray={translatedRoutes}
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
                    <Text>{data.translatedString}</Text>
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

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(SideBar)
