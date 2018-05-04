import React from "react";
import { Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Left,
  Body
} from "native-base";

const routes = [
  { name: "Accueil", link: "Home"},
  { name: "Ma collection", link: "CardListScreen"},
  { name: "Préférences", link: "NOPE", icon: "cog"},
  { name: "A propos", link: "NOPE"}]

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
                    {data.icon != null ? (<Icon name={data.icon} />) : null}
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
