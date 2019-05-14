import * as firebase from 'firebase'

export const googleAndroidClientId = "xxxxxxxx"

const config = {
  apiKey: "xxxxxxxx",
  authDomain: "xxxxxxxx",
  databaseURL: "xxxxxxxx",
  projectId: "xxxxxxxx",
  storageBucket: "xxxxxxxx",
  messagingSenderId: "xxxxxxxx",
};

firebase.initializeApp(config)

export default firebase
