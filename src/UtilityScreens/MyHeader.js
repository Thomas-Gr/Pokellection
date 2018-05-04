import React from "react";
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";

export default class MyHeader extends React.Component {
	constructor(props) {
        super(props);
    }

  render() {
    return (
	    <Header>
	      <Left>
	        <Button
	          transparent
	          onPress={() => this.props.navigation.navigate("DrawerOpen")}
	        >
	          <Icon name="menu" />
	        </Button>
	      </Left>
	      <Body>
	        <Title>Pokellection</Title>
	      </Body>
	      <Right />
	    </Header>
    );
  }
}
