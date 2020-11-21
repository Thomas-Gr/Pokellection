import {
  Body,
  Container,
  Content,
  Left,
  ListItem,
  Right,
  Text
} from 'native-base';
import MyCheckBox from '../UtilityScreens/MyCheckBox';
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

class CategoryItem extends React.PureComponent {
  render() {
    const configDefinition = SerieConfig[this.props.item].definition

    return (
      <ListItem>
        <Left style={{flex:0.15}}>
          {
            configDefinition.image != ""
              ? (<Image source={SeriesLogos[configDefinition.image]} style={{flex: 1, width: 30, height: 30, resizeMode: 'contain'}}/>)
              : (null)
          }
        </Left>
        <Body style={{flex:0.7}}>
          <Text style={{fontSize:15}}>
            {language(this.props.setsLanguage, configDefinition)}
          </Text>
        </Body>
        <Right style={{flex:0.15}}>
          <MyCheckBox
              value={this.props.isChecked}
              onValueChange={this.props.action}/>
        </Right>
      </ListItem>
    )
  }
}

class SerieSelectionScreen extends React.PureComponent {
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
    this.props.dispatch({ type: "SET_SERIES", value: this.state.locallySelectedSeries })
    this.setState({locallySelectedSeries: null});
  }

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
        <SectionList
           sections={HomeSerieConfig}
           keyExtractor={item => item}
           renderItem={({ item }) => 
              <CategoryItem 
                item={item} 
                setsLanguage={this.props.setsLanguage} 
                isChecked={this.state.locallySelectedSeries == null
                  ? this.props.selectedSeries[item] == true
                  : this.state.locallySelectedSeries[item] == true}
                action={() => this.updateSerie(item)}/> 
            }
           numColumns={1}
           initialNumToRender={12}
           renderSectionHeader={this._renderSectionHeader}
           />
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

export default connect(mapStateToProps)(SerieSelectionScreen)
