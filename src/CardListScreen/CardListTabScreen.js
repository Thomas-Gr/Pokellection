import * as React from 'react';

import { Dimensions, View, Platform } from 'react-native';

import AdBanner from "../UtilityScreens/AdBanner.js";
import CardInformationScreen from "./CardInformationScreen.js";
import CardListConfigurationScreen from "./CardListConfigurationScreen.js";
import CardListScreen from "./CardListScreen.js";
import { Container } from 'native-base';
import ImageView from 'react-native-image-view';
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';
import { TabView } from 'react-native-tab-view'
import { connect } from 'react-redux'
import { language } from "../i18n.js"

class CardListTabScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeSelection = this.changeSelection.bind(this);
    this.showConfigurationPanel = this.showConfigurationPanel.bind(this);
    this.hideConfigurationPanel = this.hideConfigurationPanel.bind(this);
    this.addCard = this.addCard.bind(this);
    this.showCardInformation = this.showCardInformation.bind(this);
    this.hideCardInformation = this.hideCardInformation.bind(this);

    const series = [].concat(...props.seriesToDisplay.map(a => a.data))
    const firstIndex = series.indexOf(props.route.params.serieName);

    this.state = {
      index: firstIndex,
      initialIndex: firstIndex,
      routes: series.map(a => ({key: a})),
      listConfigurationVisible: false,
      cardInformationVisible: false,
      selectedCard: null,
      hasSelectedCard: false
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.route.params == undefined) {
      return null;
    }
    const series = [].concat(...props.seriesToDisplay.map(a => a.data))
    const firstIndex = series.indexOf(props.route.params.serieName);

    if (firstIndex !== state.initialIndex) {
      return {
        index: firstIndex,
        initialIndex: firstIndex,
        routes: series.map(a => ({key: a})),
        listConfigurationVisible: false,
        cardInformationVisible: false,
        selectedCard: null,
        hasSelectedCard: false
      };
    }

    return null;
  }

  showConfigurationPanel() {
    this.setState({listConfigurationVisible: true});
  }

  hideConfigurationPanel() {
    this.setState({listConfigurationVisible: false});
  }

  hideCardInformation() {
    this.setState({cardInformationVisible: false, hasSelectedCard: false});
  }

  showCardInformation(card) {
    this.setState({
      cardInformationVisible: true,
      selectedCard: card,
      hasSelectedCard: this.props.collections[this.state.routes[this.state.index].key] != null
          && this.props.collections[this.state.routes[this.state.index].key][card.id] != null
    });
  }

  changeSelection(selection: string, display: string, unselectedRarities: string[], unselectedTypes: string[]) {
    this.props.dispatch({ 
      type: "CHANGE_CONFIG", 
      value: {
        selection: selection, 
        display: display, 
        unselectedRarities: unselectedRarities, 
        unselectedTypes: unselectedTypes
      } 
    })
  }

  addCard(collectionName, card) {
    this.props.dispatch({ type: "ADD_CARD", value: {collectionName: collectionName, card: card} })
  }

  _renderTabBar = route => null;
  _handleIndexChange = index => this.setState({ index: index });

  _renderScene = ({ route }) => {
    if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 1) {
      return <View />;
    }

    return <CardListScreen
      serieName={route.key}
      selectCard={(card) => this.showCardInformation(card)}
      addCard={(name, card) => this.addCard(name, card)}
      />;
  };

  hideImage(image) {
    this.props.dispatch({ type: "HIDE_IMAGE" })
  }

  render() {
    if (this.props.route.params === undefined) {
      return null;
    }

    const imageView = this.props.showImage
      ? <ImageView
              images={[{source: this.props.imageToShow, width: 250, height: 358}]}
              imageIndex={0}
              isVisible={this.props.showImage}
              onClose={() => this.hideImage()}
          />
      : null;

    const actualList = Platform.OS == 'web'
        ? <CardListScreen
            serieName={this.props.route.params.serieName}
            selectCard={(card) => this.showCardInformation(card)}
            addCard={(name, card) => this.addCard(name, card)}
            />
        : <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            onIndexChange={this._handleIndexChange}
            renderTabBar={(route) => null}
            initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
          />

    return (
      <Container>
        <MyHeader {...this.props} title={language(this.props.setsLanguage, SerieConfig[this.state.routes[this.state.index].key].definition)} selectionFunction={this.showConfigurationPanel}/>
          <CardListConfigurationScreen
            visible={this.state.listConfigurationVisible}
            hide={this.hideConfigurationPanel}
            changeSelection={(selection, display, unselectedRarities, unselectedTypes) => this.changeSelection(selection, display, unselectedRarities, unselectedTypes)}/>

          <CardInformationScreen
            serieName={this.state.routes[this.state.index].key}
            visible={this.state.cardInformationVisible}
            hide={this.hideCardInformation}
            hasSelectedCard={this.state.hasSelectedCard}
            selectedCard={this.state.selectedCard}
            addCard={(name, card) => this.addCard(name, card)}/>

          {actualList}

          {imageView}
      <AdBanner/>
    </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    seriesToDisplay: state.seriesToDisplay,
    collections: state.collections,
    setsLanguage: state.setsLanguage,
    showImage: state.showImage,
    imageToShow: state.imageToShow
  }
}

export default connect(mapStateToProps)(CardListTabScreen)
