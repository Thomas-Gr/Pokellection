import React from "react";
import { StatusBar, StyleSheet, Image, ListView, View, Dimensions, TouchableOpacity, List, FlatList } from "react-native";
import MyHeader from "../UtilityScreens/MyHeader.js";
import GymChallenge from "../Config/ImageConfig/GymChallenge.js";
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Picker,
  Form
} from "native-base";

export default class CardItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    const data = this.props.data;
    const collectionName = this.props.collectionName;

    const image = GymChallenge[data.pictures[0]] != null
      ? GymChallenge[data.pictures[0]]
      : GymChallenge['BlaineArcanineGymChallenge1.jpg'];

    return (
      <TouchableOpacity onPress={() => this.props.addCard(collectionName, data)}>
        <View style={{borderWidth:0.5, borderColor:'#d6d7da', margin:0.5}}>
          <Image
            style={{flex:1, height:170, width: Dimensions.get('window').width / 3 - 2}}
            source={image}
          />
          <Text style={{textAlign: 'center', fontSize: 10}}> {item.owned ? "yes" : "No"} {data.name.substring(0, 16)}</Text>
        </View>
      </TouchableOpacity>
     )
  }
}
