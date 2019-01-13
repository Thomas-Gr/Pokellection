import React from "react";
import { Image, FlatList, Modal, TouchableHighlight, TouchableOpacity, View, Dimensions, Linking, StyleSheet} from "react-native";
import { Text, Container, Body, Content, Item, Picker, Form, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import SerieConfig from '../Config/SerieConfig.js';
import TypesLogos from '../Config/TypesLogos.js';
import RaritiesLogos from '../Config/RaritiesLogos.js';

const rarities = [
  [
    "NONE",
    "COMMON",
    "UNCOMMON",
    "RARE"
  ],
  [
    "RARE_HOLO",
    "SUPER_RARE",
    "SUPER_RARE_HOLO",
    "ULTRA_RARE_UNCOMMON"
  ]
];

export default class CardListConfigurationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cardsToDisplay: props.selection,
      styleToDisplay: props.display,
      unselectedRarities: props.unselectedRarities
    };
  }

  onCardsToDisplayChange(value: string) {
    this.setState({
      cardsToDisplay: value
    });
  }

  onStyleToDisplayChange(value: string) {
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
          : <Image source={RaritiesLogos[rarity].image}/>;

        return (
          <Col key={rarity} style={[{margin:1}, this.state.unselectedRarities[rarity] ? {opacity: 0.1} : null]}>
            <TouchableOpacity
              onPress={() => this.updateRarities(rarity)}
              style={styles.cell}>
                {image}
            </TouchableOpacity>
          </Col>);
      });
      return (<Row key={row[0]}>{content}</Row>);
    })

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
                <View style={{flex: 1, backgroundColor: 'white', padding: 20}}>
                    <Grid>
                      <Row>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Configuration:</Text>
                      </Row>
                      <Row>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: undefined }}
                            placeholder="Cards to display"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.cardsToDisplay}
                            onValueChange={this.onCardsToDisplayChange.bind(this)}
                          >
                            <Picker.Item label="Show all cards" value="all" />
                            <Picker.Item label="Show only collected cards" value="got" />
                            <Picker.Item label="Show only non collected cards" value="miss" />
                          </Picker>
                        </Row>
                        <Row>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: undefined }}
                            placeholder="Display Style"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.styleToDisplay}
                            onValueChange={this.onStyleToDisplayChange.bind(this)}
                          >
                            <Picker.Item label="Show cards with picture" value="pictures" />
                            <Picker.Item label="Show a detailed list of cards" value="list" />
                          </Picker>
                        </Row>
                        <Row>
                            <Grid>
                              {rarityElements}
                            </Grid>
                        </Row>
                        <Row>
                          <Button bordered style={{marginTop: 30}} onPress={() => {
                                this.props.changeSelection(this.state.cardsToDisplay, this.state.styleToDisplay, this.state.unselectedRarities);
                                this.props.hide();
                              }}>
                            <Text style={{fontWeight: 'bold'}}>DONE</Text>
                          </Button>
                        </Row>
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
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    width:'100%',
    height:'100%'
  }
});
