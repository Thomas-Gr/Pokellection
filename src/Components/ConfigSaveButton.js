import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux'
import { string } from "../i18n.js"

export default class ConfigSaveButton extends Component {
  render() {
    return (
      <View style={styles.bottomBanner}>
        <Button block warning onPress={() => this.props.saveUpdate()}>
          <Text>{string('button.save')}</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomBanner: {
    position: "relative",
    bottom: 0,
    width: '100%'
  }
});
