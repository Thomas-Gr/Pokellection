import { Button, Text } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';
import { default as ModalWeb } from 'modal-react-native-web';
import { language, string } from '../i18n.js';

import RaritiesLogos from '../Config/RaritiesLogos.js';
import React from "react";
import SerieConfig from '../Config/SerieConfig.js';
import TypesLogos from '../Config/TypesLogos.js';
import { connect } from 'react-redux'

class CardInformationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  showImage(image) {
    this.props.dispatch({ type: "SHOW_IMAGE", value: image })
  }

  render() {
    const selectedCard = this.props.selectedCard;

    if (selectedCard == undefined) {
      return null;
    }

    const serie = SerieConfig[this.props.serieName];

    var card;
    if (selectedCard.number > 0) {
      if (serie.definition.numberSuffix == "none") {
         card = '(' + selectedCard.number + ')'
      } else {
        if (serie.definition.numberOfZeros != 0) {
          card = ('000' + selectedCard.number).slice(-serie.definition.numberOfZeros);
        } else {
          card = selectedCard.number
        }

        card += '/'

        if (serie.definition.numberSuffix != undefined) {
          card += serie.definition.numberSuffix
        } else {
          if (serie.definition.numberOfZeros != 0) {
            card += ('000' + Object.keys(serie.definition.cards).length).slice(-serie.definition.numberOfZeros);
          } else {
            card += Object.keys(serie.definition.cards).length
          }
        }
      }
    }

    const image = serie.pictures[selectedCard.picture] != null
        ? serie.pictures[selectedCard.picture]
        : require('../../resources/images/missing.png');

    const wikiLink = selectedCard.wikiLink != null
        ? (
            <Button style={{marginTop:10}} block onPress={() => Linking.openURL('https://bulbapedia.bulbagarden.net/wiki/' + selectedCard.wikiLink)}>
              <Text adjustsFontSizeToFit={true} numberOfLines={1}>{string('misc.openWiki')}</Text>
            </Button>
          )
        : null;

    const type = TypesLogos[selectedCard.type] != null || selectedCard.type == "NON_TCG"
        ? <Image source={TypesLogos[selectedCard.type]} style={{width:20, height:20}}/>
        : <Text style={{backgroundColor: 'white'}}>{selectedCard.type.charAt(0)}</Text>;

    const type2 = TypesLogos[selectedCard.type2] != null
        ? <Image source={TypesLogos[selectedCard.type2]} style={{width:20, height:20}}/>
        : null;

    const rarity = RaritiesLogos[selectedCard.rarity] != null
        ? <Image source={RaritiesLogos[selectedCard.rarity].image}/>
        : null;

    const explanation = selectedCard.explanation != null
        ? <Row style={{marginTop:20}}>
            <View style={{padding: 10, justifyContent: 'center', alignItems: 'center', width:'100%', height: 60, marginTop: 40}}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{selectedCard.explanation}</Text>
            </View>
          </Row>
        : null;

    const modalSize = selectedCard.explanation != null ? '60%' : '50%'

    const firstRowStyle = selectedCard.explanation == null ? {height: 40} : null;

    const modalContent = <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.hide()}
        style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',flex: 1}}>
        <View style={{
          marginTop: '25%',
          marginLeft: '10%',
          width: '80%',
          height: modalSize, 
          backgroundColor: 'white'}}>
          <Grid>
            <Row style={firstRowStyle}>
              <View style={{backgroundColor: '#3f51b5', padding: 5, justifyContent: 'center', alignItems: 'center', width:'100%', height: 40}}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>{rarity} {type}{type2} {language(this.props.cardsLanguage, selectedCard)} {card}</Text>
              </View>
            </Row>
            <Row>
              <Grid>
                <Col style={styles.centered}>
                  <TouchableOpacity onPress={() => this.showImage(image)}>
                      <Image
                        style={{width: Dimensions.get('window').width / 3 - 6, height: 170}}
                        source={image}
                      />
                      </TouchableOpacity>
                </Col>
                <Col style={styles.centered}>
                  <View style={{width:'90%'}}>
                    <Button block onPress={() => { this.props.hide(); this.props.addCard(this.props.serieName, this.props.selectedCard); }}>
                      <Text adjustsFontSizeToFit={true} numberOfLines={1}>{this.props.hasSelectedCard ? string('misc.remove') : string('misc.add')}{string('misc.card')}</Text>
                    </Button>

                    {wikiLink}

                    <Button block style={{marginTop:10}} onPress={() => Linking.openURL('https://www.mercari.com/jp/search/?keyword=%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%83%89+' + language('ja', selectedCard))}>
                      <Text adjustsFontSizeToFit={true} numberOfLines={1}>{string('misc.searchMercari')}</Text>
                    </Button>

                    <Button block style={{marginTop:10}} onPress={() => Linking.openURL('https://auctions.yahoo.co.jp/search/search?auccat=&tab_ex=commerce&ei=utf-8&aq=-1&oq=&sc_i=&fr=auc_top&p=%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%83%89%E3%80%80' + language('ja', selectedCard))}>
                      <Text adjustsFontSizeToFit={true} numberOfLines={1}>{string('misc.searchYahoo')}</Text>
                    </Button>
                  </View>
                </Col>
              </Grid>
            </Row>
            {explanation}
          </Grid>
        </View>
  </TouchableOpacity>

    if (Platform.OS == 'web') {
      return (
        <ModalWeb
            animationType="fade"
            transparent={true}
            visible={this.props.visible}
            onRequestClose={() => this.props.hide()}>
          {modalContent}
        </ModalWeb>
      );
    } else {
      return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.visible}
            onRequestClose={() => this.props.hide()}>
          {modalContent}
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  fullSpace: {
    width: '100%',
    height: '100%'
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    cardsLanguage: state.cardsLanguage,
    language: state.language
  }
}

export default connect(mapStateToProps)(CardInformationScreen)
