import React, { Component } from "react";

import HomeScreen from "./HomeScreen.js";
import ResearchsScreen from "../Researchs/ResearchsScreen.js";
import SerieSelection from "../Preferences/SerieSelection.js";
import CardListScreen from "../CardListScreen/CardListScreen.js";
import SideBar from "../SideBar/SideBar.js";

import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    ResearchsScreen: { screen: ResearchsScreen },
    CardListScreen: { screen: CardListScreen },
    SerieSelection: { screen: SerieSelection }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
