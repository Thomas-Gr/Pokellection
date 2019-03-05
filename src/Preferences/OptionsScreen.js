import {
  ActionSheet,
  Body,
  Container,
  Content,
  List,
  ListItem,
  Text
} from 'native-base';
import React, { Component } from 'react';

import AdBanner from "../UtilityScreens/AdBanner.js";
import ConfigSaveButton from '../Components/ConfigSaveButton.js';
import MyHeader from "../UtilityScreens/MyHeader.js";
import { connect } from 'react-redux'
import { string } from "../i18n.js"

class OptionsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sorting: null,
      menuLanguage: null,
      cardsLanguage: null,
      setsLanguage: null
    }

    this.updateSorting = this.updateSorting.bind(this);
    this.updateMenuLanguage = this.updateMenuLanguage.bind(this);
    this.updateCardsLanguage = this.updateCardsLanguage.bind(this);
    this.updateSetsLanguage = this.updateSetsLanguage.bind(this);
    this.openActionSheet = this.openActionSheet.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
  }

  updateSorting(value) {
    if (value != undefined) {
      this.setState({sorting: this.props.unumberedSorting == value.key ? null : value.key});
    }
  }

  updateMenuLanguage(value) {
    if (value != undefined) {
      this.setState({menuLanguage: this.props.language == value.key ? null : value.key});
    }
  }

  updateCardsLanguage(value) {
    if (value != undefined) {
      this.setState({cardsLanguage: this.props.cardsLanguage == value.key ? null : value.key});
    }
  }

  updateSetsLanguage(value) {
    if (value != undefined) {
      this.setState({setsLanguage: this.props.setsLanguage == value.key ? null : value.key});
    }
  }

  saveUpdate(value) {
    this.props.dispatch({ type: "UPDATE_PREFERENCES", value: this.state })
    this.setState({sorting: null, menuLanguage: null, cardsLanguage: null, setsLanguage: null});
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

  createOptions() {
    return [
      {
        name: "sorting",
        value: this.state.sorting || this.props.unumberedSorting,
        savedValue: this.props.unumberedSorting,
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
      },
      {
        name: "menu-language",
        value: this.state.menuLanguage || this.props.language,
        savedValue: this.props.language,
        text: string("options.menu-language.name"),
        binding: { "en": 0, "fr": 1, "ja": 2 },
        options: [
          {
            name: "english",
            key: "en",
            text: string("options.menu-language.en")
          },
          {
            name: "french",
            key: "fr",
            text: string("options.menu-language.fr")
          },
          {
            name: "japanese",
            key: "ja",
            text: string("options.menu-language.ja")
          }
        ],
        updateFunction: this.updateMenuLanguage
      },
      {
        name: "cards-language",
        value: this.state.cardsLanguage || this.props.cardsLanguage,
        savedValue: this.props.cardsLanguage,
        text: string("options.cards-language.name"),
        binding: { "en": 0, "fr": 1, "ja": 2 },
        options: [
          {
            name: "english",
            key: "en",
            text: string("options.cards-language.en")
          },
          {
            name: "french",
            key: "fr",
            text: string("options.cards-language.fr")
          },
          {
            name: "japanese",
            key: "ja",
            text: string("options.cards-language.ja")
          }
        ],
        updateFunction: this.updateCardsLanguage
      },
      {
        name: "sets-language",
        value: this.state.setsLanguage || this.props.setsLanguage,
        savedValue: this.props.setsLanguage,
        text: string("options.sets-language.name"),
        binding: { "en": 0, "fr": 1, "ja": 2 },
        options: [
          {
            name: "english",
            key: "en",
            text: string("options.sets-language.en")
          },
          {
            name: "french",
            key: "fr",
            text: string("options.sets-language.fr")
          },
          {
            name: "japanese",
            key: "ja",
            text: string("options.sets-language.ja")
          }
        ],
        updateFunction: this.updateSetsLanguage
      },
    ]
  }

  createSaveButton() {
    if (this.state.sorting != null
        || this.state.menuLanguage != null
        || this.state.cardsLanguage != null
        || this.state.setsLanguage != null) {
      return (<ConfigSaveButton saveUpdate={() => this.saveUpdate()} />)
    }

    return null;
  }

  render() {
    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
          <List
            dataArray={this.createOptions()}
            renderRow={data => {
              return (
                <ListItem button onPress={() => this.openActionSheet(data)}>
                  <Body>
                    <Text style={data.value != data.savedValue ? {fontWeight: 'bold'} : null}>{data.text} {data.options[data.binding[data.value]].text}</Text>
                  </Body>
                </ListItem>
              );
            }}
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
    language: state.language,
    cardsLanguage: state.cardsLanguage,
    setsLanguage: state.setsLanguage,
    unumberedSorting: state.unumberedSorting
  }
}

export default connect(mapStateToProps)(OptionsScreen)
