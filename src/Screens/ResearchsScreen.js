import { Container, Content, ListItem, Text } from 'native-base';
import { Image, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import AdBanner from "../UtilityScreens/AdBanner.js";
import CardInformationScreen from "../CardListScreen/CardInformationScreen.js";
import CardListConfigurationScreen from '../CardListScreen/CardListConfigurationScreen.js';
import SeriesLogos from '../Config/SeriesLogos.js';
import CardListScreen from '../CardListScreen/CardListScreen.js';
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import MyHeader from "../UtilityScreens/MyHeader.js";
import { SectionList } from 'react-native';
import SerieConfig from '../Config/SerieConfig.js';
import { connect } from 'react-redux'
import { language, string } from "../i18n.js"
import ImageView from 'react-native-image-view';

class ResearchsScreen extends Component {
  constructor(props) {
    super(props);
    const selectedSeries = this.filterSelectedSeriesOnly(HomeSerieConfig, this.props.selectedSeries)
    const maxCards = 200
    this.state = {
      listConfigurationVisible: false,
      cardInformationVisible: false,
      selectedCard: null,
      selectedSerie: null,
      selectedSeries: selectedSeries,
      hasSelectedCard: false,
      seriesToDisplay: this.buildList(selectedSeries, maxCards),
      hasAtLeastOneSerieHidden: this.hasAtLeastOneSerieHidden(selectedSeries, maxCards),
      maxCards: maxCards
    };

    this.changeSelection = this.changeSelection.bind(this);
    this.showConfigurationPanel = this.showConfigurationPanel.bind(this);
    this.hideConfigurationPanel = this.hideConfigurationPanel.bind(this);
    this.addCard = this.addCard.bind(this);
    this.showCardInformation = this.showCardInformation.bind(this);
    this.hideCardInformation = this.hideCardInformation.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  showConfigurationPanel() {
    this.setState({listConfigurationVisible: true});
  }

  hideConfigurationPanel() {
    this.setState({listConfigurationVisible: false});
  }

  changeSelection(selection: string, display: string, unselectedRarities: string[], unselectedTypes: string[]) {
    this.props.dispatch(
      { 
        type: "CHANGE_CONFIG", 
        value: {
          selection: selection,
           display: display, 
           unselectedRarities: unselectedRarities,
           unselectedTypes: unselectedTypes
         } 
       })
  }

  buildList(filteredSerie, maxCards) {
    var current = 0

    var result = filteredSerie
        .map(key => ({
          title: language(this.props.setsLanguage, SerieConfig[key].definition),
          data: [{name: key}]
        }))
        .filter(obj => this.props.collections[obj.data[0].name] == undefined ||
            Object.keys(this.props.collections[obj.data[0].name]).length !=
                Object.keys(SerieConfig[obj.data[0].name].definition.cards).length)
        .map(obj => {
          var displayed

          if (current >= maxCards) {
            displayed = false;
          } else {
            const owned = this.props.collections[obj.data[0].name] == undefined
                ? 0
                : Object.keys(this.props.collections[obj.data[0].name]).length

            const total = Object.keys(SerieConfig[obj.data[0].name].definition.cards).length

            current += total - owned
            displayed = true
          }

          return {...obj, isDisplayed: displayed}
        })
        .filter(obj => obj.isDisplayed)

    return result
  }

  hasAtLeastOneSerieHidden(filteredSerie, maxCards) {
    var current = 0
    var key;
    for (key of filteredSerie) {
      if (this.props.collections[key] == undefined ||
            Object.keys(this.props.collections[key]).length !=
                Object.keys(SerieConfig[key].definition.cards).length) {
          const owned = this.props.collections[key] == undefined
            ? 0
            : Object.keys(this.props.collections[key]).length

          const total = Object.keys(SerieConfig[key].definition.cards).length

          current += total - owned

          if (current > maxCards) {
            return true
          }
      }
    }

    return false;
  }

  filterSelectedSeriesOnly(allSeries, selectedSeries) {
    return [].concat(...allSeries.map(x => x.data, allSeries)).filter(key => selectedSeries[key])
  }

  addCard(collectionName, card) {
    this.props.dispatch({ type: "ADD_CARD", value: {collectionName: collectionName, card: card} })
  }

  hideImage(image) {
    this.props.dispatch({ type: "HIDE_IMAGE" })
  }

  _renderItem = ({item}) => (
      <CardListScreen
          serieName={item.name}
          forcedSelection="miss"
          selectCard={(card) => this.showCardInformation(item.name, card)}
          addCard={(name, card) => this.addCard(name, card)}
          />
  )

  _renderSectionHeader = ({section}) => {
    const image = SerieConfig[section.data[0].name].definition.image
    return (
      <ListItem itemDivider>
        {
          image != ""
            ? (<Image source={SeriesLogos[image]} style={{width: 20, resizeMode: 'contain', marginRight: 10}}/>)
            : (null)
        }
        <Text style={{fontWeight: 'bold'}}>{section.title}</Text>
      </ListItem>
    )
  }

  hideCardInformation() {
    this.setState({cardInformationVisible: false, hasSelectedCard: false});
  }

  showCardInformation(serieName, card) {
    this.setState({
      cardInformationVisible: true,
      selectedCard: card,
      selectedSerie: serieName,
      hasSelectedCard: this.props.collections[serieName] != null
          && this.props.collections[serieName][card.id] != null
    });
  }

  loadMore() {
    const newMaxCards = this.state.maxCards + 50
    this.setState({
      seriesToDisplay: this.buildList(this.state.selectedSeries, newMaxCards),
      hasAtLeastOneSerieHidden: this.hasAtLeastOneSerieHidden(this.state.selectedSeries, newMaxCards),
      maxCards: newMaxCards
    });
  }

  render() {
    const explanation = this.state.hasAtLeastOneSerieHidden
        ? <View style={styles.filteredBanner}>
            <Text style={styles.warning} onPress={() => this.loadMore()}>{string('misc.setsHidden')}</Text>
          </View>
        : null;

    const imageView = this.props.showImage
        ? <ImageView
             images={[{source: this.props.imageToShow, width: 250, height: 358}]}
             imageIndex={0}
             onClose={() => this.hideImage()}
         />
         : null

    return (
      <Container>
        <MyHeader {...this.props} selectionFunction={this.showConfigurationPanel}/>
        <SectionList
           sections={this.state.seriesToDisplay}
           keyExtractor={item => item}
           renderItem={this._renderItem}
           numColumns={1}
           initialNumToRender={1}
           renderSectionHeader={this._renderSectionHeader}
           />

         {explanation}

         <CardInformationScreen
           serieName={this.state.selectedSerie}
           visible={this.state.cardInformationVisible}
           hide={this.hideCardInformation}
           hasSelectedCard={this.state.hasSelectedCard}
           selectedCard={this.state.selectedCard}
           addCard={(name, card) => this.addCard(name, card)}/>

         <CardListConfigurationScreen
             visible={this.state.listConfigurationVisible}
             hide={this.hideConfigurationPanel}
             forcedResearched='miss'
             changeSelection={(selection, display, unselectedRarities, unselectedTypes) => this.changeSelection(selection, display, unselectedRarities, unselectedTypes)}/>

         {imageView}
        <AdBanner />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  filteredBanner: {
    position: "relative",
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffa500',
  },
  warning: {
    color: 'white',
    textAlign: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    selectedSeries: state.selectedSeries,
    collections: state.collections,
    setsLanguage: state.setsLanguage,
    showImage: state.showImage,
    imageToShow: state.imageToShow
  }
}

export default connect(mapStateToProps)(ResearchsScreen)
