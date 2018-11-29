import React from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
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
      return (
        <View style={{marginTop: 15}}>
          <TouchableOpacity onPress={this.props.selectionFunction}>
            <Icon name="sound-mix" type="Entypo" style={{color: 'white'}}/>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
	    <Header>
	      <Left style={{flex: 0.15}}>
	        <Button
	          transparent
	          onPress={() => this.props.navigation.openDrawer()}
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
