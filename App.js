import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Container, Content, Picker, Button, Text, Root } from "native-base";
import * as Expo from 'expo'
import * as Font from 'expo-font'
import { Provider } from 'react-redux'
import * as ScreenOrientation from 'expo-screen-orientation';
import Modal from 'modal-react-native-web';

import Store from './src/Store/configureStore.js'
import HomeScreenRouter from "./src/index.js";

export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      Entypo: require("native-base/Fonts/Entypo.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    Modal.setAppElement('body');

    if (Platform.OS != "web") {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <Provider store={Store}><Root><HomeScreenRouter /></Root></Provider>;
  }
}
