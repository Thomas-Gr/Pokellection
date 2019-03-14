import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import AboutScreen from "./Screens/AboutScreen.js";
import CardListTabScreen from "./CardListScreen/CardListTabScreen.js";
import HomeScreen from "./Screens/HomeScreen.js";
import { Platform } from "react-native";
import React from 'react';
import ResearchsScreen from "./Screens/ResearchsScreen.js";
import SerieSelectionScreen from "./Screens/SerieSelectionScreen.js";
import OptionsScreen from "./Screens/OptionsScreen.js";
import SideBar from "./SideBar/SideBar.js";

const StackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ResearchsScreen: { screen: ResearchsScreen },
    CardListScreen: { screen: CardListTabScreen },
    SerieSelectionScreen: { screen: SerieSelectionScreen },
    AboutScreen: { screen: AboutScreen },
    OptionsScreen: { screen: OptionsScreen },
  },
  {
    initialRouteName: 'Home',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    headerMode: 'none'
  }
);

const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: StackNavigator },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: 'Home',
  }
);
export default HomeScreenRouter;
