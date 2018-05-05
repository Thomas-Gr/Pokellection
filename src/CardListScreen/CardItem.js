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
        <View style={{borderWidth:0.5, borderColor:'#d6d7da', margin:0.5}}>
          <Image
            style={{flex:1, height:170, width: Dimensions.get('window').width / 3 - 2}}
            source={image}
          />
          <Text style={{textAlign: 'center', fontSize: 10}}>{item.owned ? "yes" : "No"} {data.name.substring(0, 16)}</Text>
        </View>
      </TouchableOpacity>
     )
  }
}
