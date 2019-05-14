import { Container, Content } from 'native-base';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import React, { Component } from 'react';

import * as Connection from '../utils/Connection.js';
import * as firebase from '../utils/Firebase.js'
import AdBanner from "../UtilityScreens/AdBanner.js";
import MyHeader from "../UtilityScreens/MyHeader.js";

class ConnectionScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSigningIn: false,
      signedIn: Connection.getUid() != null
    }

    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.onConnection = this.onConnection.bind(this);
  }

  signInWithGoogle() {
    this.setState({isSigningIn: true})

    Connection.signInWithGoogleAsync(
        result => this.onConnection(result),
        result => {
          this.setState({isSigningIn: false})
          console.log(result)
        })
  }

  onConnection(result) {
    firebase.default.database().ref('/userConfiguration/' + Connection.getUid())
        .once('value')
        .then(snapshot => {
          const hasOnlineContent = snapshot != null
          const hasLocalContent = Object.keys(this.props.collections).length > 0

          if (hasLocalContent && !hasOnlineContent) {
            this.saveLocalContentOnline()
          } else if (hasOnlineContent) { // TODO: in the case there is content both locally and online, ask the user
            const values = snapshot.val()
            this.saveOnlineContentLocally(values)
          }
        })
  }

  saveOnlineContentLocally(values) {
    this.props.dispatch({
      type: "LOAD_FROM_MEMORY",
      value: {
        collections: JSON.parse(values.collections),
        selectedSeries: JSON.parse(values.selectedSeries),
        unselectedRarities: values.unselectedRarities,
        display: values.display,
        selection: values.selection,
        language: values.language,
        cardsLanguage: values.cardsLanguage,
        setsLanguage: values.setsLanguage,
        unumberedSorting: values.unumberedSorting
    }});

    this.setState({signedIn: true, isSigningIn: false})
  }

  saveLocalContentOnline() {
    firebase.default.database()
      .ref('/userConfiguration/' + Connection.getUid())
      .set({
        collections: JSON.stringify(this.props.collections),
        selectedSeries: JSON.stringify(this.props.selectedSeries),
        unselectedRarities: this.props.unselectedRarities,
        display: this.props.display,
        selection: this.props.selection,
        language: this.props.language,
        cardsLanguage: this.props.cardsLanguage,
        setsLanguage: this.props.setsLanguage,
        unumberedSorting: this.props.unumberedSorting,
      })
      .then(() => this.setState({signedIn: true, isSigningIn: false}))
      .catch(e => console.log(e))
  }

  signOut() {
    Connection.signOff()
    this.setState({signedIn: false})
  }

  render() {
    return (
      <Container>
        <MyHeader {...this.props}/>
        <Content>
          <View>
            <TouchableOpacity onPress={() => console.log(Connection.getUid())}>
                <Text h1>Is logged in?</Text>
            </TouchableOpacity>

            {
              this.state.isSigningIn
                ? <Text>Signing in</Text>
                : this.state.signedIn
                    ? <TouchableOpacity onPress={() => this.signOut()}>
                          <Text h1>You're logged in, sign off</Text>
                      </TouchableOpacity>
                    : <TouchableOpacity onPress={() => this.signInWithGoogle()}>
                          <Text h1>Log in with Google</Text>
                      </TouchableOpacity>
            }

          </View>
        </Content>
        <AdBanner />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    seriesToDisplay: state.seriesToDisplay,
    collections: state.collections,
    language: state.language,
    cardsLanguage: state.cardsLanguage,
    setsLanguage: state.setsLanguage,
    unumberedSorting: state.unumberedSorting,
    selectedSeries: state.selectedSeries,
    unselectedRarities: state.unselectedRarities,
    display: state.display,
    selection: state.selection,
  }
}

export default connect(mapStateToProps)(ConnectionScreen)
