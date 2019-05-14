import * as firebase from './Firebase.js'

import { Google } from 'expo';

export function getUid() {
  if (firebase.default.auth() != null && firebase.default.auth().currentUser != null) {
    return firebase.default.auth().currentUser.uid
  }

  return null
}

export function signOff() {
  return firebase.default.auth().signOut()
}

export async function signInWithGoogleAsync(success, error) {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      androidClientId: firebase.googleAndroidClientId,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      onSignIn(result, result => success(result), result => error(result))
    }
  } catch(e) {
    error(e)
  }
}

function onSignIn(user, success, error) {
  var unsubscribe = firebase.default.auth().onAuthStateChanged(firebaseUser => {
    unsubscribe();

    var credential = firebase.default.auth.GoogleAuthProvider.credential(
        user.idToken,
        user.accessToken);

    firebase.default.auth().signInAndRetrieveDataWithCredential(credential)
        .then(() => success(user))
        .catch(error => console.log(error));
  });
}
