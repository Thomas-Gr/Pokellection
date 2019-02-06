import React, { Component } from "react";

import HomeScreen from "./HomeScreen.js";
import ResearchsScreen from "../Researchs/ResearchsScreen.js";
import SerieSelection from "../Preferences/SerieSelection.js";
import CardListScreen from "../CardListScreen/CardListScreen.js";
import CardListTabScreen from "../CardListScreen/CardListTabScreen.js";
import SideBar from "../SideBar/SideBar.js";
import About from "../Screens/About.js";

import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Platform } from "react-native";

const StackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ResearchsScreen: { screen: ResearchsScreen },
    CardListScreen: { screen: CardListTabScreen },
    SerieSelection: { screen: SerieSelection },
    About: { screen: About }
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
