import {
  Body,
  CheckBox,
  Container,
  Content,
  Left,
  ListItem,
  Right,
  Text
} from 'native-base';
import { Image, SectionList } from 'react-native';
import React, { Component } from 'react';

import AdBanner from "../UtilityScreens/AdBanner.js";
import ConfigSaveButton from '../Components/ConfigSaveButton.js'
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';
import { connect } from 'react-redux'
import { language } from "../i18n.js"

class SerieSelection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locallySelectedSeries: null,
    }

    this.updateSerie = this.updateSerie.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
  }

  updateSerie(item) {
    var series;

    if (this.state.locallySelectedSeries == null) {
      series = Object.assign({}, this.props.selectedSeries);
    } else {
      series = Object.assign({}, this.state.locallySelectedSeries);
    }

    if (series[item] != null) {
      series[item] = !series[item];
    } else {
      series[item] = true;
    }

    this.setState({locallySelectedSeries: series});
  }

  saveUpdate() {
    console.log(this.state.locallySelectedSeries);
    this.props.dispatch({ type: "SET_SERIES", value: this.state.locallySelectedSeries })
    this.setState({locallySelectedSeries: null});
  }

  _renderItem = ({item}) => (
    <ListItem>
      <Left style={{flex:0.15}}>
        {
          SerieConfig[item].definition.image != ""
            ? (<Image source={SeriesLogos[SerieConfig[item].definition.image]} />)
            : (null)
        }
      </Left>
      <Body style={{flex:0.7}}>
        <Text style={{fontSize:15}}>
          {language(this.props.setsLanguage, SerieConfig[item].definition)}
        </Text>
      </Body>
      <Right style={{flex:0.15}}>
        <CheckBox
            checked={this.state.locallySelectedSeries == null
                ? this.props.selectedSeries[item] == true
                : this.state.locallySelectedSeries[item] == true}
            onPress={() => this.updateSerie(item)}/>
      </Right>
    </ListItem>
  )

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{language(this.props.language, section)}</Text></ListItem>
  )

  createSaveButton() {
    if (this.state.locallySelectedSeries != null) {
      return (<ConfigSaveButton saveUpdate={() => this.saveUpdate()} />)
    }

    return null;
  }

  render() {
    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
        <SectionList
           sections={HomeSerieConfig}
           keyExtractor={item => item}
           renderItem={this._renderItem}
           numColumns={1}
           initialNumToRender={12}
           renderSectionHeader={this._renderSectionHeader}
           />
        </Content>
        {this.createSaveButton()}
        <AdBanner />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSeries: state.selectedSeries,
    setsLanguage: state.setsLanguage,
    language: state.language
  }
}

export default connect(mapStateToProps)(SerieSelection)
