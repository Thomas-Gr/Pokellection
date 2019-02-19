import { FlatList, View } from 'react-native';

import CardItem from "./CardItem.js";
import React from "react";
import SerieConfig from '../Config/SerieConfig.js';
import { connect } from 'react-redux'
import makeGetDisplayedCards from "../selectors/dataSourceSelectors.js";

class CardListScreen extends React.Component {
  constructor(props) {
    super(props);

    var serie = SerieConfig[props.serieName].definition;

    this.state = {
      name: serie.name,
      cards: serie.cards,
      showNumbers: serie.showNumbers
    };
  }

  _switchLongSelectionMode = () => this.props.dispatch({ type: "SWITCH_LONG_SELECTION_MODE" })

  _renderItem = ({item}) => (<CardItem
    collectionName={this.state.name}
    item={item}
    data={this.state.cards[item.id.toString()]}
    showNumbers={this.state.showNumbers}
    switchLongSelectionMode={this._switchLongSelectionMode}
    addCard={this.props.addCard}
    selectCard={this.props.selectCard}/>)

  render() {
    return this.props.display == 'list'
        ? <View><FlatList
           data={this.props.dataSource}
           keyExtractor={item => 'list' + item.id.toString()}
           initialNumToRender={15}
           renderItem={this._renderItem}/></View>
        : <FlatList
           data={this.props.dataSource}
           keyExtractor={item => 'pictures' + item.id.toString()}
           numColumns={3}
           initialNumToRender={12}
           renderItem={this._renderItem}/>
  }
}

const makeMapStateToProps = () => {
  const displayedCards = makeGetDisplayedCards()
  const mapStateToProps = (state, props) => {
    return {
      display: state.display,
      dataSource: displayedCards(state, props)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(CardListScreen)
