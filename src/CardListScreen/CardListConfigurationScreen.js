import { Button, Icon, Text } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid";
import { Image, StyleSheet, TouchableOpacity, View, Modal, Platform } from 'react-native';
import { default as ModalWeb } from 'modal-react-native-web';
import RaritiesLogos from '../Config/RaritiesLogos.js';
import React from "react";
import { connect } from 'react-redux'
import { string } from "../i18n.js"

const selections = [
  {name: "all", icon: "circle-o"},
  {name: "got", icon: "check-circle-o"},
  {name: "miss", icon: "times-circle-o"}
]

const displays = [
  {name: "picture", icon: "th"},
  {name: "list", icon: "th-list"}
]

const rarities = [
  [
    "NONE",
    "COMMON",
    "UNCOMMON"
  ],
  [
    "RARE",
    "RARE_HOLO",
    "SUPER_RARE",
  ],
  [
    "SHINING_HOLO",
    "ULTRA_RARE_UNCOMMON"
  ],
  [
    "EX",
    "SHINY_RARE_HOLO"
  ]
];

class CardListConfigurationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forcedResearched: props.research,
      cardsToDisplay: props.selection,
      styleToDisplay: props.display,
      unselectedRarities: props.unselectedRarities
    };
  }

  updateSelection(value) {
    this.setState({
      cardsToDisplay: value
    });
  }

  updateDisplay(value) {
    this.setState({
      styleToDisplay: value
    });
  }

  updateRarities(rarity) {
    let rarities = Object.assign({}, this.state.unselectedRarities);

    if (rarities[rarity] != null) {
      delete rarities[rarity];
    } else {
      rarities[rarity] = true;
    }

    this.setState({unselectedRarities: rarities});
  }

  render() {
    const rarityElements = rarities.map(row => {
      const content = row.map(rarity => {
        const image = RaritiesLogos[rarity] == null
          ? <Text>/</Text>
          : <Image source={RaritiesLogos[rarity].image} style={{width:RaritiesLogos[rarity].width / 3,height:RaritiesLogos[rarity].height / 3}}/>;

        return (
          <Col key={rarity} style={[{margin:0.8}, this.state.unselectedRarities[rarity] ? {opacity: 0.1} : null]}>
            <TouchableOpacity
              onPress={() => this.updateRarities(rarity)}
              style={styles.cell}>
                {image}
            </TouchableOpacity>
          </Col>);
      });
      return (<Row key={row[0]}>{content}</Row>);
    })

    const displayElements = displays.map(element => {
        return (
          <Col key={element.name} style={[{margin:0.8}, this.state.styleToDisplay != element.name ? {opacity: 0.1} : null]}>
            <TouchableOpacity
              onPress={() => this.updateDisplay(element.name)}
              style={styles.cell}>
                <Icon name={element.icon} type="FontAwesome"/>
            </TouchableOpacity>
          </Col>);
    })

    const selectionElements = this.props.forcedResearched == null
        ? selections.map(element => {
            return (
              <Col key={element.name} style={[{margin:1}, this.state.cardsToDisplay != element.name ? {opacity: 0.1} : null]}>
                <TouchableOpacity
                  onPress={() => this.updateSelection(element.name)}
                  style={styles.cell}>
                    <Icon name={element.icon} type="FontAwesome"/>
                </TouchableOpacity>
              </Col>);
        })
        : null;

    const selectionRow = this.props.forcedResearched == null
        ? (<Row><Grid><Row>{selectionElements}</Row></Grid></Row>)
        : null;

    /*
    There's a hack here: the View doesn't actually take the entire height of the TouchableOpacity
     As a result tapping just below the white space won't actually close the Modal...
    */
    const modalContent = <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.hide()}
                style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',flex: 1}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  marginTop: '15%',
                  marginLeft: '10%',
                  width: '80%',
                  height: '70%'}}>
                <View style={{flex: 1, backgroundColor: 'white', padding: 20}}>
                    <Grid>
                      <Row>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>{string('misc.configuration')}</Text>
                      </Row>
                          {selectionRow}
                      <Row>
                        <Grid>
                          <Row>{displayElements}</Row>
                        </Grid>
                      </Row>
                      <Row>
                        <Grid>
                          {rarityElements}
                        </Grid>
                      </Row>
                      <Row>
                        <Button block bordered style={{marginTop: 15, marginBottom: 15, width:'100%'}} onPress={() => {
                              this.props.changeSelection(this.state.cardsToDisplay, this.state.styleToDisplay, this.state.unselectedRarities);
                              this.props.hide();
                            }}>
                          <Text style={{fontWeight: 'bold'}}>{string('button.save')}</Text>
                        </Button>
                      </Row>
                    </Grid>
                </View>
            </TouchableOpacity>
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
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    width:'100%',
    height:'100%'
  }
});

const mapStateToProps = (state) => {
  return {
    research: state.research,
    selection: state.selection,
    display: state.display,
    unselectedRarities: state.unselectedRarities,
    language: state.language
  }
}

export default connect(mapStateToProps)(CardListConfigurationScreen)
