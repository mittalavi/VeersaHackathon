import  firebase from "firebase"
import "firebase/firebase-database";

const firebaseConfig = {
  apiKey: "AIzaSyCCUIaIb5k9T0lP1IfZOsRo-mGCn57_ToQ",
  authDomain: "shrink4shrink.firebaseapp.com",
  projectId: "shrink4shrink",
  storageBucket: "shrink4shrink.appspot.com",
  messagingSenderId: "299205315787",
  appId: "1:299205315787:web:d9223453b7c56cc8e75f4e",
  measurementId: "G-946JJW6SDB"
};

firebase.initializeApp(firebaseConfig);

export default firebase;