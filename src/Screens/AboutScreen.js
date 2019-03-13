import { Container, Content } from 'native-base';
import { Linking, StyleSheet, Text, View } from "react-native";
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { string } from "../i18n.js"
import AdBanner from "../UtilityScreens/AdBanner.js";
import MyHeader from "../UtilityScreens/MyHeader.js";

class AboutScreen extends Component {
  render() {
    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
          <View style={styles.view}>
            <Text h1 style={styles.title}>{string('about.version')}</Text>
            <Text style={styles.padded}>0.1</Text>

            <Text h1 style={styles.title}>{string('about.team')}</Text>
            <Text>{string('about.developer')}</Text>
            <Text>{string('about.designer')}</Text>
            <Text style={styles.padded}>{string('about.pictures')}</Text>

            <Text h1 style={styles.title}>{string('about.license')}</Text>
            <Text style={styles.padded}>{string('about.license2')}</Text>

            <Text h1 style={styles.title}>{string('about.contact')}</Text>
            <Text style={[styles.padded, styles.link]} onPress={() => Linking.openURL('https://github.com/Thomas-Gr/Pokellection')}>
              https://github.com/Thomas-Gr/Pokellection
            </Text>

            <Text h1 style={styles.title}>{string('about.tip')}</Text>
            <Text style={styles.padded}>
              {string('about.tipMessage')}{' '}
              <Text style={styles.link} onPress={() => Linking.openURL('https://paypal.me/GrTh')}>
                https://paypal.me/GrTh
              </Text>
            </Text>

            <Text h1 style={styles.title}>{string('about.disclaimer')}</Text>
            <Text>
              1.   {string('about.disclaimer1')}{' '}
              <Text style={[styles.padded, styles.link]} onPress={() => Linking.openURL('http://bulbapedia.bulbagarden.net/')}>
                Bulbapedia
              </Text>
            </Text>
            <Text style={styles.padded}>
              2.   {string('about.disclaimer2')}
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

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(AboutScreen)
