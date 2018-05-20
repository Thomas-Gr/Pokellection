import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
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

  renderSelectionButton() {
    if (this.props.selectionFunction != null) {
      if (this.props.selection == 'got') {
        return (
          <Right>
            <TouchableOpacity onPress={this.props.selectionFunction}>
              <Icon name="check-circle" type="FontAwesome" style={{color: 'white'}}/>
            </TouchableOpacity>
          </Right>
        )
      } else if (this.props.selection == 'miss') {
        return (
          <Right>
            <TouchableOpacity onPress={this.props.selectionFunction}>
              <Icon name="times-circle" type="FontAwesome" style={{color: 'white'}}/>
            </TouchableOpacity>
          </Right>
        )
      } else {
        return (
          <Right>
            <TouchableOpacity onPress={this.props.selectionFunction}>
              <Icon name="check-circle" type="FontAwesome" style={{color: 'white', opacity: 0.2}}/>
            </TouchableOpacity>
          </Right>
        )
      }
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
        {this.renderSelectionButton()}
	    </Header>
    );
  }
}
