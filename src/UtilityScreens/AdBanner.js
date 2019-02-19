import React, { Component } from 'react';

import { AdMobBanner } from 'expo';
import { StyleSheet } from 'react-native';

export default class AdBanner extends Component {
  bannerError() {
    console.log("An error happened");
    return;
  }

  render() {
    return (
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="smartBannerPortrait"
          adUnitID="xxxxx"
          didFailToReceiveAdWithError={this.bannerError}
        />
    );
  }
}

const styles = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0
  }
});
