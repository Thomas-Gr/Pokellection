import React, { Component } from 'react';

import { AdMobBanner } from 'expo';
import { StyleSheet, View } from 'react-native';

export default class AdBanner extends Component {
  bannerError() {
    console.log("An error happened");
    return;
  }

  render() {
    return (
      <View>
       <View style={styles.margin} />
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="smartBannerPortrait"
          adUnitID="xxxxx"
          didFailToReceiveAdWithError={this.bannerError}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  margin: {
    height: 50
  }
});
