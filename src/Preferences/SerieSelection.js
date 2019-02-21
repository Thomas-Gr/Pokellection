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
import { language } from "../i18n.js"
import AdBanner from "../UtilityScreens/AdBanner.js";
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';
import { connect } from 'react-redux'

class SerieSelection extends Component {
  updateSerie(item) {
    this.props.dispatch({ type: "SET_SERIES", value: item })
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
          {language(this.props.language, SerieConfig[item].definition)}
        </Text>
      </Body>
      <Right style={{flex:0.15}}>
        <CheckBox checked={this.props.selectedSeries[item] == true} onPress={() => this.updateSerie(item)}/>
      </Right>
    </ListItem>
  )

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{language(this.props.language, section)}</Text></ListItem>
  )

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
        <AdBanner />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSeries: state.selectedSeries,
    language: state.language
  }
}

export default connect(mapStateToProps)(SerieSelection)
