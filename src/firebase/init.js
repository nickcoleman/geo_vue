// Initialize Firebase
import firebase from "firebase"
import firestore from "firebase/firestore"

import { API_KEY } from "./env"

const config = {
  apiKey: API_KEY,
  authDomain: "view-geo.firebaseapp.com",
  databaseURL: "https://view-geo.firebaseio.com",
  projectId: "view-geo",
  storageBucket: "view-geo.appspot.com",
  messagingSenderId: "975479569523"
}

const firebaseApp = firebase.initializeApp(config)

// export firestore database
export default firebaseApp.firestore()
