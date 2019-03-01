import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import About from "../Screens/About.js";
import CardListTabScreen from "../CardListScreen/CardListTabScreen.js";
import HomeScreen from "./HomeScreen.js";
import { Platform } from "react-native";
import React from 'react';
import ResearchsScreen from "../Researchs/ResearchsScreen.js";
import SerieSelection from "../Preferences/SerieSelection.js";
import OptionsScreen from "../Preferences/OptionsScreen.js";
import SideBar from "../SideBar/SideBar.js";

const StackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ResearchsScreen: { screen: ResearchsScreen },
    CardListScreen: { screen: CardListTabScreen },
    SerieSelection: { screen: SerieSelection },
    About: { screen: About },
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
