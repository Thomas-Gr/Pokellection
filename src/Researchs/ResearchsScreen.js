import { Container, Content, ListItem, Text } from 'native-base';
import React, { Component } from 'react';

import AdBanner from "../UtilityScreens/AdBanner.js";
import CardInformationScreen from "../CardListScreen/CardInformationScreen.js";
import CardListConfigurationScreen from '../CardListScreen/CardListConfigurationScreen.js';
import CardListScreen from '../CardListScreen/CardListScreen.js';
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import MyHeader from "../UtilityScreens/MyHeader.js";
import { SectionList } from 'react-native';
import SerieConfig from '../Config/SerieConfig.js';
import { connect } from 'react-redux'
import { language } from "../i18n.js"

class ResearchsScreen extends Component {
  constructor() {
    super();
    this.state = {
      launched: false,
      listConfigurationVisible: false,
      cardInformationVisible: false,
      selectedCard: null,
      selectedSerie: null,
      hasSelectedCard: false
    };

    this.changeSelection = this.changeSelection.bind(this);
    this.showConfigurationPanel = this.showConfigurationPanel.bind(this);
    this.hideConfigurationPanel = this.hideConfigurationPanel.bind(this);
    this.addCard = this.addCard.bind(this);
    this.showCardInformation = this.showCardInformation.bind(this);
    this.hideCardInformation = this.hideCardInformation.bind(this);
  }

  componentWillMount() {
    this.setState({
      seriesToDisplay: this.buildList(this.filterSelectedSeriesOnly(HomeSerieConfig, this.props.selectedSeries)),
      launched: true
    });
  }

  showConfigurationPanel() {
    this.setState({listConfigurationVisible: true});
  }

  hideConfigurationPanel() {
    this.setState({listConfigurationVisible: false});
  }

  changeSelection(selection: string, display: string, unselectedRarities: string[]) {
    this.props.dispatch({ type: "CHANGE_CONFIG", value: {selection: selection, display: display, unselectedRarities: unselectedRarities} })
  }

  buildList(filteredSerie) {
    return filteredSerie
        .map(key => ({
          title: language(this.props.setsLanguage, SerieConfig[key].definition),
          data: [{name: key}]
        }))
        .filter(obj => this.props.collections[obj.data[0].name] == undefined ||
            Object.keys(this.props.collections[obj.data[0].name]).length !=
                Object.keys(SerieConfig[obj.data[0].name].definition.cards).length);
  }

  filterSelectedSeriesOnly(allSeries, selectedSeries) {
    return [].concat(...allSeries.map(x => x.data, allSeries)).filter(key => selectedSeries[key])
  }

  addCard(collectionName, card) {
    this.props.dispatch({ type: "ADD_CARD", value: {collectionName: collectionName, card: card} })
  }

  _renderItem = ({item}) => (
      <CardListScreen
          serieName={item.name}
          forcedSelection="miss"
          selectCard={(card) => this.showCardInformation(item.name, card)}
          addCard={(name, card) => this.addCard(name, card)}
          />
  )

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{section.title}</Text></ListItem>
  )

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

  render() {
    if (!this.state.launched) {
      return (
        <Container>
          <Content/>
        </Container>
      );
    } else {
      return (
        <Container>
          <MyHeader {...this.props} selectionFunction={this.showConfigurationPanel}/>
          <Content>
            <SectionList
               sections={this.state.seriesToDisplay}
               keyExtractor={item => item}
               renderItem={this._renderItem}
               numColumns={1}
               initialNumToRender={1}
               renderSectionHeader={this._renderSectionHeader}
               />

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
                 changeSelection={(selection, display, unselectedRarities) => this.changeSelection(selection, display, unselectedRarities)}/>
          </Content>
          <AdBanner />
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSeries: state.selectedSeries,
    collections: state.collections,
    setsLanguage: state.setsLanguage
  }
}

export default connect(mapStateToProps)(ResearchsScreen)
