import React, { Component } from 'react';

import { AdMobBanner } from 'expo-ads-admob';
import { StyleSheet, View, Platform } from 'react-native';

export default class AdBanner extends Component {
  bannerError() {
    console.log("An error happened");
    return;
  }

  render() {
    if (Platform.OS != "web") {
      return (
        <View>
         <View style={styles.margin} />
          <AdMobBanner
            style={styles.bottomBanner}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5825529948495220/9502913447"
            didFailToReceiveAdWithError={this.bannerError}
          />
          </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    height: 60
  },
  margin: {
    height: 60
  }
});
