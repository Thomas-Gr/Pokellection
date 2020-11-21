import { language } from "../i18n.js"
import {
  Body,
  Container,
  Content,
  Left,
  ListItem,
  Right,
  Text,
  Icon
} from 'native-base';
import { Image, SectionList } from 'react-native';
import React, { Component } from 'react';

import AdBanner from "../UtilityScreens/AdBanner.js";
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';
import { connect } from 'react-redux'

class HomeScreen extends Component {

  _renderItem = ({item}) => {
    const got = this.props.collections[item] == null ? 0 : Object.keys(this.props.collections[item]).length
    const total = Object.keys(SerieConfig[item].definition.cards).length

    const message = got == total
      ? <Icon name="check" type="FontAwesome" style={{color: '#aaa'}}/>
      : (got == 0
        ? <Icon name="remove" type="FontAwesome" style={{color: '#aaa'}}/>
        : got + '/' + total)
    return (
      <ListItem style={{backgroundColor:"transparent"}} onPress={() => this.props.navigation.navigate(
          'CardListScreen', { serieName: item })}>
        <Left style={{flex:0.15}}>
          {
            SerieConfig[item].definition.image != ""
              ? (<Image source={SeriesLogos[SerieConfig[item].definition.image]} style={{flex: 1, width: 30, height: 30, resizeMode: 'contain'}}/>)
              : (null)
          }
        </Left>
        <Body style={{flex:0.67}}>
          <Text style={{fontSize: 15}}>
            {language(this.props.setsLanguage, SerieConfig[item].definition)}
          </Text>
        </Body>
        <Right style={{flex: 0.17}}>
          <Text note>
            {message}
          </Text>
        </Right>
      </ListItem>
    )
  }

  _renderSectionHeader = ({section}) => (
    <ListItem itemDivider><Text style={{fontWeight: 'bold'}}>{section.title}</Text></ListItem>
  )

  render() {
    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
        <SectionList
           sections={this.props.seriesToDisplay}
           keyExtractor={item => item}
           renderItem={this._renderItem}
           numColumns={1}
           initialNumToRender={12}
           renderSectionHeader={this._renderSectionHeader}
           />
           </Content>
        <AdBanner/>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    seriesToDisplay: state.seriesToDisplay,
    collections: state.collections,
    language: state.language,
    setsLanguage: state.setsLanguage
  }
}

export default connect(mapStateToProps)(HomeScreen)
