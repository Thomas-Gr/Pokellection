import React, { Component } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo";

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
