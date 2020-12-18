import { FlatList, View, Platform } from 'react-native';

import CardItem from "./CardItem.js";
import React from "react";
import SerieConfig from '../Config/SerieConfig.js';
import { connect } from 'react-redux'
import refreshCardList from "./CardListHelper.js";

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

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.dataSource) != JSON.stringify(nextProps.dataSource)
        || this.props.display != nextProps.display;
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
        ? (Platform.OS == 'web'
            ? <span>
                <FlatList
                 data={this.props.dataSource}
                 keyExtractor={item => 'list' + item.id.toString()}
                 initialNumToRender={20}
                 windowSize={20}
                 maxToRenderPerBatch={20}
                 onEndReachedThreshold={0.5}
                 renderItem={this._renderItem}/>
               </span>
            : <View>
                <FlatList
                 data={this.props.dataSource}
                 keyExtractor={item => 'list' + item.id.toString()}
                 initialNumToRender={20}
                 windowSize={20}
                 maxToRenderPerBatch={20}
                 onEndReachedThreshold={0.5}
                 renderItem={this._renderItem}/>
               </View>
           )
        : <FlatList
           data={this.props.dataSource}
           keyExtractor={item => 'pictures' + item.id.toString()}
           numColumns={3}
           initialNumToRender={12}
           windowSize={12}
           maxToRenderPerBatch={12}
           onEndReachedThreshold={0.5}
           renderItem={this._renderItem}/>
  }
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state, ownProps) => {
    return {
      display: state.display,
      dataSource: refreshCardList(
        SerieConfig[ownProps.serieName].definition.cards,
        state.collections[ownProps.serieName],
        ownProps.forcedSelection || state.selection,
        state.unselectedRarities,
        state.unselectedTypes,
        state.unumberedSorting)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(CardListScreen)
