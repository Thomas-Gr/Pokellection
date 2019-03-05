import { Body, Button, Card, Icon, Left, ListItem, Right, Row, Text } from "native-base";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";

import RaritiesLogos from '../Config/RaritiesLogos.js';
import React from "react";
import SerieConfig from '../Config/SerieConfig.js';
import TypesLogos from '../Config/TypesLogos.js';
import { connect } from 'react-redux'
import { language } from "../i18n.js"

class CardItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    const data = this.props.data;
    const showNumbers = this.props.showNumbers;
    const collectionName = this.props.collectionName;

    if (this.props.display == 'list') {
      return this.displayListStyle(item, data, showNumbers, collectionName);
    } else {
      return this.displayPictureStyle(item, data, showNumbers, collectionName);
    }
  }

  displayListStyle(item, data, showNumbers, collectionName) {
    const type = TypesLogos[data.type] != null
        ? <Image source={TypesLogos[data.type]} style={{width:20,height:20}}/>
        : <Text style={{backgroundColor: 'white'}}>{data.type.charAt(0)}</Text>;

    const rarity = RaritiesLogos[data.rarity] != null
        ? <Left style={{flex:0.1}}><Image source={RaritiesLogos[data.rarity].image} style={{height:RaritiesLogos[data.rarity].height/2, width:RaritiesLogos[data.rarity].width/2}}/></Left>
        : null;

    const explanation = data.explanation != null
        ? <Row style={{height: 60}}>
            <View style={{padding: 10, justifyContent: 'center', alignItems: 'center', width:'100%'}}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{data.explanation}</Text>
            </View>
          </Row>
        : null;

    return (
      <ListItem>
        <Left style={{flex:0.1}}>
          {type}
        </Left>
        {rarity}
        <Body style={{flex: RaritiesLogos[data.rarity] != null ? 0.7 : 0.8}}>
          <TouchableOpacity onPress={() => this.props.selectCard(this.props.data)}>
            <Text style={{fontSize:15, fontWeight: 'bold'}}>
              {data.number > 0 ? this.showNumber(data) : ""}{language(this.props.cardsLanguage, data)}
            </Text>
          </TouchableOpacity>
        </Body>
        <Right style={{flex:0.1}}>
          <TouchableOpacity
              onPress={() => this.props.addCard(this.props.collectionName, this.props.data)}>
            <Icon name="check-square-o" type="FontAwesome" style={item.owned ? styles.yes : styles.no_2}/>
          </TouchableOpacity>
        </Right>
      </ListItem>
     )
  }

  displayPictureStyle(item, data, showNumbers, collectionName) {
    const image = SerieConfig[collectionName].pictures[data.picture] != null
      ? SerieConfig[collectionName].pictures[data.picture]
      : require('../../resources/images/missing.png');

    const icon = item.owned ? 'trash' : 'add';
    const text = item.owned ? 'Remove' : 'Add';

    const quickAdd = this.props.inLongSelectionMode
      ?
        (
          <Button iconLeft
              style={{position: 'absolute', alignSelf: 'center', zIndex:10, marginTop:70}}
              onPress={() => this.props.addCard(this.props.collectionName, this.props.data)}>
            <Icon name={icon} />
            <Text>{text}</Text>
          </Button>
        )
      : null;

    return (
      <TouchableOpacity
          onPress={() => {
            if (!this.props.inLongSelectionMode) {
              this.props.selectCard(this.props.data);
            }
          }}
          onLongPress={() => this.props.switchLongSelectionMode()}>
        <Card style={{flex:1, width: Dimensions.get('window').width / 3 - 4, margin: 1, padding: 1}}>
          <Body>
            {quickAdd}
            <Icon name="check-square-o" type="FontAwesome" style={[styles.checkbox, item.owned ? styles.yes : styles.no]}/>
            <Image
              style={{width: Dimensions.get('window').width / 3 - 6, height: 170}}
              source={image}
            />
            <Text style={{textAlign: 'center', fontSize: 10}}>{showNumbers == true ? this.showNumber(data) : ""}{language(this.props.cardsLanguage, data).substring(0, 21)}</Text>
          </Body>
        </Card>
      </TouchableOpacity>
     )
  }

  showNumber(data) {
    if (data.number == -42) {
      return "";
    } else {
      return data.number + " / ";
    }
  }
}

const styles = StyleSheet.create({
  checkbox: {
    position: 'absolute',
    zIndex: 10,
    bottom: 12,
    right: 0,
    fontSize: 20
  },
  yes: {
    opacity: 1,
    color: 'black'
  },
  no: {
    opacity: 0.2
  },
  no_2: {
    opacity: 0.4
  }
});

const mapStateToProps = (state) => {
  return {
    display: state.display,
    inLongSelectionMode: state.inLongSelectionMode,
    cardsLanguage: state.cardsLanguage
  }
}

export default connect(mapStateToProps)(CardItem)
