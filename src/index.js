import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Container } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AboutScreen from "./Screens/AboutScreen.js";
import CardListTabScreen from "./CardListScreen/CardListTabScreen.js";
import HomeScreen from "./Screens/HomeScreen.js";
import ResearchsScreen from "./Screens/ResearchsScreen.js";
import SerieSelectionScreen from "./Screens/SerieSelectionScreen.js";
import OptionsScreen from "./Screens/OptionsScreen.js";
import SideBar from "./SideBar/SideBar.js";
import * as CollectionMemory from "./State/CollectionMemory.js";
import * as PreferencesMemory from "./State/PreferencesMemory.js";
import * as SelectionMemory from "./State/SelectionMemory.js";
import { language, string } from "./i18n.js"
import { connect } from 'react-redux'
import SerieConfig from './Config/SerieConfig.js';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const linking = {
  config: {
    screens: {
      Home: '',
      ResearchsScreen: 'researchs',
      CardListScreen: 'cards',
      AboutScreen: 'about',
      SerieSelectionScreen: 'sets',
      OptionsScreen: 'options'
    },
  },
};

const titles = {
  'Home': null,
  'ResearchsScreen': 'researchs',
  'CardListScreen': null,
  'AboutScreen': 'about',
  'SerieSelectionScreen': 'seriesSelection',
  'OptionsScreen': 'preferences'
};

function MyStackNavigator() {
  return (
      <Stack.Navigator 
        initialRouteName="Home"
        mode="card"
        headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ResearchsScreen" component={ResearchsScreen} />
          <Stack.Screen name="CardListScreen" component={CardListTabScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="SerieSelectionScreen" component={SerieSelectionScreen} />
          <Stack.Screen name="OptionsScreen" component={OptionsScreen} />
      </Stack.Navigator>
  );
}

class MainNavigator extends Component {
  constructor(props) {
    super(props);

    this.fetchAndUpdateState = this.fetchAndUpdateState.bind(this);

    this.fetchAndUpdateState();
  }

  fetchAndUpdateState() {
    if (!this.props.isLoaded) {
      SelectionMemory.getSelection((selection) => {
        SelectionMemory.getDisplay((display) => {
          SelectionMemory.getUnselectedRarities((unselectedRarities) => {
            SelectionMemory.getUnselectedTypes((unselectedTypes) => {
              PreferencesMemory.getSerieSelection((selectedSeries) => {
                PreferencesMemory.getLanguage((language) => {
                  PreferencesMemory.getCardsLanguage((cardsLanguage) => {
                    PreferencesMemory.getSetsLanguage((setsLanguage) => {
                      PreferencesMemory.getUnumberedSorting((unumberedSorting) => {
                        CollectionMemory.getCollection(selectedSeries, (collections) => {
                          this.props.dispatch({
                            type: "LOAD_FROM_MEMORY",
                            value: {
                              collections: collections,
                              selectedSeries: selectedSeries,
                              unselectedRarities: unselectedRarities,
                              unselectedTypes: unselectedTypes,
                              display: display,
                              selection: selection,
                              language: language,
                              cardsLanguage: cardsLanguage,
                              setsLanguage: setsLanguage,
                              unumberedSorting: unumberedSorting
                          }});
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    }
  }

  render() {
    if (!this.props.isLoaded) {
      return (<Container></Container>)
    }
    
    return (
      <ActionSheetProvider>
        <NavigationContainer initialRouteName="Home" linking={linking} documentTitle={{
            formatter: (options, route) => {
              if (titles[route.name] != null) {
                return `${string('section.' +titles[route.name])} - Pokellection`
              } else if (route?.params?.serieName != null) {
                const setName = language(this.props.setsLanguage, SerieConfig[route.params.serieName].definition)
                return `${setName}  - Pokellection`;
              } else {
                return 'Pokellection';
              }
            }
          }}>
          <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="ResearchsScreen" component={ResearchsScreen} />
              <Drawer.Screen name="CardListScreen" component={CardListTabScreen} />
              <Drawer.Screen name="AboutScreen" component={AboutScreen} />
              <Drawer.Screen name="SerieSelectionScreen" component={SerieSelectionScreen} />
              <Drawer.Screen name="OptionsScreen" component={OptionsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ActionSheetProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoaded: state.isLoaded,
    language: state.language,
    setsLanguage: state.setsLanguage
  }
}

export default connect(mapStateToProps)(MainNavigator)

/*

const createApp = Platform.select({
  web: config => createBrowserApp(config, {history: 'hash'}),
  default: config=> createAppContainer(config)
})

export default createApp(createSwitchNavigator({
  main: MainNavigator,
}, { initialRouteName: 'main' }))

*/