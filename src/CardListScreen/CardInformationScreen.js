import { Button, Text } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
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

  render() {
    const selectedCard = this.props.selectedCard;

    if (selectedCard == undefined) {
      return null;
    }

    const serie = SerieConfig[this.props.serieName];

    var card;
    if (selectedCard.number > 0) {
      card = selectedCard.number + '/' + Object.keys(serie.definition.cards).length
    }

    const image = serie.pictures[selectedCard.picture] != null
        ? serie.pictures[selectedCard.picture]
        : require('../../resources/images/missing.png');

    const wikiLink = selectedCard.wikiLink != null
        ? (
            <Button block onPress={() => Linking.openURL('https://bulbapedia.bulbagarden.net/wiki/' + selectedCard.wikiLink)}>
              <Text>{string('misc.openWiki')}</Text>
            </Button>
          )
        : null;

    const type = TypesLogos[selectedCard.type] != null
        ? <Image source={TypesLogos[selectedCard.type]} style={{width:20, height:20}}/>
        : <Text style={{backgroundColor: 'white'}}>{selectedCard.type.charAt(0)}</Text>;

    const rarity = RaritiesLogos[selectedCard.rarity] != null
        ? <Image source={RaritiesLogos[selectedCard.rarity].image}/>
        : null;

    const explanation = selectedCard.explanation != null
        ? <Row style={{height: 60}}>
            <View style={{padding: 10, justifyContent: 'center', alignItems: 'center', width:'100%'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{selectedCard.explanation}</Text>
            </View>
          </Row>
        : null;

    /*
    There's a hack here: the View doesn't actually take the entire height of the TouchableOpacity
     As a result tapping just below the white space won't actually close the Modal...
    */
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.visible}
            onRequestClose={() => this.props.hide()}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.hide()}
                style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',flex: 1}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  marginTop: '25%',
                  marginLeft: '10%',
                  width: '80%',
                  height: '60%'}}>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                  <Grid>
                    <Row style={{height: 40}}>
                      <View style={{backgroundColor: '#3f51b5', padding: 5, justifyContent: 'center', alignItems: 'center', width:'100%'}}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{rarity} {type} {language(this.props.cardsLanguage, selectedCard)} {card}</Text>
                      </View>
                    </Row>
                    <Row>
                      <Grid>
                        <Col style={styles.centered}>
                            <Image
                              style={{width: Dimensions.get('window').width / 3 - 6, height: 170}}
                              source={image}
                            />
                        </Col>
                        <Col style={styles.centered}>
                          <View style={{width:'90%'}}>
                            <Button block style={{marginBottom:10}} onPress={() => { this.props.hide(); this.props.addCard(this.props.serieName, this.props.selectedCard); }}>
                              <Text>{this.props.hasSelectedCard ? string('misc.remove') : string('misc.add')}{string('misc.card')}</Text>
                            </Button>

                            {wikiLink}
                          </View>
                        </Col>
                      </Grid>
                    </Row>
                    {explanation}
                  </Grid>
                </View>
            </TouchableOpacity>
          </TouchableOpacity>
      </Modal>
    );
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
