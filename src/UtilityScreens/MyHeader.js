import React from "react";
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  Body,
  Content,
  Header,
  Title,
  Subtitle,
  Left,
  Icon,
  Right
} from "native-base";

export default class MyHeader extends React.Component {
  subtitle() {
    if (this.props.title != null) {
      return (<Subtitle>{this.props.title}</Subtitle>)
    } else {
      return (null);
    }
  }

  render() {
    return (
	    <Header>
	      <Left style={{flex: 0.15}}>
	        <Button
	          transparent
	          onPress={() => this.props.navigation.navigate("DrawerOpen")}
	        >
	          <Icon name="menu" />
	        </Button>
	      </Left>
	      <Body style={{flex: 0.85}}>
	        <Title>Pokellection</Title>
          {this.subtitle()}
	      </Body>
	    </Header>
    );
  }
}
