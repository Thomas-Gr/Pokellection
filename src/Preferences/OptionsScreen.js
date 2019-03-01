import {
  Body,
  CheckBox,
  Container,
  Content,
  Left,
  ListItem,
  Right,
  Text,
  ActionSheet,
  List
} from 'native-base';
import { Image, SectionList } from 'react-native';
import React, { Component } from 'react';
import { string } from "../i18n.js"
import AdBanner from "../UtilityScreens/AdBanner.js";
import HomeSerieConfig from '../Config/HomeSerieConfig.js';
import MyHeader from "../UtilityScreens/MyHeader.js";
import SerieConfig from '../Config/SerieConfig.js';
import SeriesLogos from '../Config/SeriesLogos.js';
import { connect } from 'react-redux'

class OptionsScreen extends Component {
  constructor(props) {
    super(props)
    this.updateSorting = this.updateSorting.bind(this);
    this.openActionSheet = this.openActionSheet.bind(this);
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

  updateSorting(value) {
    if (value != undefined) {
      this.props.dispatch({ type: "CHANGE_SORTING", value: value.key })
    }
  }

  openActionSheet(data) {
    ActionSheet.show(
      {
        options: data.options,
        title: data.text
      },
      buttonIndex => data.updateFunction(data.options[buttonIndex])
    );
  }

  render() {
    const choices = [
      {
        name: "sorting",
        value: this.props.unumberedSorting,
        text: string("options.sorting.name"),
        binding: { "default": 0, "us-like": 1, "bulbapedia": 2 },
        options: [
          {
            name: "official",
            key: "default",
            text: string("options.sorting.official")
          },
          {
            name: "USlike",
            key: "us-like",
            text: string("options.sorting.us-like")
          },
          {
            name: "bulbapedia",
            key: "bulbapedia",
            text: string("options.sorting.bulbapedia")
          }
        ],
        updateFunction: this.updateSorting
      }
    ]

    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
          <List
            dataArray={choices}
            renderRow={data => {
              return (
                <ListItem button onPress={() => this.openActionSheet(data)}>
                  <Body>
                    <Text>{data.text} {data.options[data.binding[data.value]].text}</Text>
                  </Body>
                </ListItem>
              );
            }}
          />
        </Content>
        <AdBanner />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    unumberedSorting: state.unumberedSorting
  }
}

export default connect(mapStateToProps)(OptionsScreen)
