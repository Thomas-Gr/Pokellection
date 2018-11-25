import React, { Component } from "react";

import HomeScreen from "./HomeScreen.js";
import ResearchsScreen from "../Researchs/ResearchsScreen.js";
import SerieSelection from "../Preferences/SerieSelection.js";
import CardListScreen from "../CardListScreen/CardListScreen.js";
import SideBar from "../SideBar/SideBar.js";
import About from "../Screens/About.js";

import { createDrawerNavigator } from "react-navigation";

const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    ResearchsScreen: { screen: ResearchsScreen },
    CardListScreen: { screen: CardListScreen },
    SerieSelection: { screen: SerieSelection },
    About: { screen: About }
  },
  {
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: 'Home'
  }
);
export default HomeScreenRouter;
