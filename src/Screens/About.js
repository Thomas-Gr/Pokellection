import { Container, Content } from 'native-base';
import { Linking, StyleSheet, Text, View } from "react-native";
import React, { Component } from 'react';

import AdBanner from "../UtilityScreens/AdBanner.js";
import MyHeader from "../UtilityScreens/MyHeader.js";

export default class About extends Component {
  render() {
    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
          <View style={styles.view}>
            <Text h1 style={styles.title}>Version:</Text>
            <Text style={styles.padded}>0.1</Text>

            <Text h1 style={styles.title}>Team:</Text>
            <Text style={styles.padded}>Developer: Arca</Text>

            <Text h1 style={styles.title}>License:</Text>
            <Text style={styles.padded}>GNU General Public License v3.0</Text>

            <Text h1 style={styles.title}>Contact:</Text>
            <Text style={[styles.padded, styles.link]} onPress={() => Linking.openURL('https://github.com/Thomas-Gr/Pokellection')}>
              https://github.com/Thomas-Gr/Pokellection
            </Text>

            <Text h1 style={styles.title}>Tip:</Text>
            <Text style={styles.padded}>
              If you enjoy the app, leave me a message and tip me on PayPal:{' '}
              <Text style={styles.link} onPress={() => Linking.openURL('https://paypal.me/GrTh')}>
                https://paypal.me/GrTh
              </Text>
            </Text>

            <Text h1 style={styles.title}>Disclaimer:</Text>
            <Text>
              1.   Most of the data has been extracted from{' '}
              <Text style={[styles.padded, styles.link]} onPress={() => Linking.openURL('http://bulbapedia.bulbagarden.net/')}>
                Bulbapedia
              </Text>
            </Text>
            <Text style={styles.padded}>
              2.   Some of the information included in this app, both literal and graphical, are property of the copyright owners
              Pokemon, Nintendo, The Pokémon Company International Inc., Creatures, GAMEFREAK and Wizards of the Coast Inc.
               respectively.
               Pokellection is not affilated with, sponsored or endorsed by, or in any way associated
               with pokemon or The Pokémon Company International Inc.
            </Text>
          </View>
        </Content>
        <AdBanner />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 20
  },
  padded: {
    marginBottom:30
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  link: {
    textDecorationLine: 'underline'
  }
});
