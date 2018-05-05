import React from "react";
import { Text } from "native-base";
import { Image, View, TouchableOpacity, Dimensions } from "react-native";
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';

export default class CardItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    const data = this.props.data;
    const collectionName = this.props.collectionName;

    const image = SerieConfig[collectionName].pictures[data.picture] != null
      ? SerieConfig[collectionName].pictures[data.picture]
      : require('../../resources/images/missing.png');

    return (
      <TouchableOpacity onPress={() => this.props.addCard(collectionName, data)}>
        <View style={{backgroundColor: item.owned ? '#4DB6AC' : '#E57373'}}>
          <Image
            style={{flex:1, height:170, width: Dimensions.get('window').width / 3 - 2, margin: 1}}
            source={image}
          />
          <Text style={{textAlign: 'center', fontSize: 10}}>{data.name.substring(0, 25)}</Text>
        </View>
      </TouchableOpacity>
     )
  }
}
