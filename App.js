import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Picker, Button, Text } from "native-base";
import * as Expo from 'expo'
import { Provider } from 'react-redux'

import Store from './src/Store/configureStore.js'
import HomeScreen from "./src/HomeScreen/index.js";

export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      MaterialCommunityIcons: require("native-base/Fonts/MaterialCommunityIcons.ttf"),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      "Material Design Icons": require("@expo/vector-icons/fonts/MaterialIcons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <Provider store={Store}><HomeScreen /></Provider>;
  }
}
