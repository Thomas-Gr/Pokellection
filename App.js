import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Picker, Button, Text, Root } from "native-base";
import * as Expo from 'expo'
import * as Font from 'expo-font'
import { Provider } from 'react-redux'

import Store from './src/Store/configureStore.js'
import HomeScreenRouter from "./src/index.js";

export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      MaterialCommunityIcons: require("native-base/Fonts/MaterialCommunityIcons.ttf"),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      MaterialIcons: require("native-base/Fonts/MaterialIcons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    Expo.ScreenOrientation.lockAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <Provider store={Store}><Root><HomeScreenRouter /></Root></Provider>;
  }
}
