import React from "react";
import { Text, Icon, Card, Body } from "native-base";
import { Image, View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';

export default class CardItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    const data = this.props.data;
    const showNumbers = this.props.showNumbers;
    const collectionName = this.props.collectionName;

    const image = SerieConfig[collectionName].pictures[data.picture] != null
      ? SerieConfig[collectionName].pictures[data.picture]
      : require('../../resources/images/missing.png');

    return (
      <TouchableOpacity onPress={() => this.props.selectCard()}>
        <Card style={{flex:1, width: Dimensions.get('window').width / 3 - 4, margin: 1, padding: 1}}>
          <Body>
            <Icon name="check-square-o" type="FontAwesome" style={[styles.checkbox, item.owned ? styles.yes : styles.no]}/>
            <Image
              style={{width: Dimensions.get('window').width / 3 - 6, height: 170}}
              source={image}
            />
            <Text style={{textAlign: 'center', fontSize: 10}}>{showNumbers == true ? this.showNumber(data) : ""}{data.name.substring(0, 25)}</Text>
          </Body>
        </Card>
      </TouchableOpacity>
     )
  }

  showNumber(data) {
    if (data.number == -42) {
      return "";
    } else {
      return data.number + " / ";
    }
  }
}

const styles = StyleSheet.create({
  checkbox: {
    position: 'absolute',
    zIndex: 10,
    bottom: 12,
    right: 0,
    fontSize: 20
  },
  yes: {
    opacity: 1
  },
  no: {
    opacity: 0.2
  }
});
