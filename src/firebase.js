import  firebase from "firebase"
import "firebase/firebase-database";

const firebaseConfig = {
	apiKey: "AIzaSyCT1lN1j3oPBs8A3YpgP4VCyXiY_z-hNew",
	authDomain: "veersa-58cb7.firebaseapp.com",
	projectId: "veersa-58cb7",
	storageBucket: "veersa-58cb7.appspot.com",
	messagingSenderId: "6870187412",
	appId: "1:6870187412:web:58df542a1111ff3bdce381",
	measurementId: "G-XLYEF2H1G4",
};

firebase.initializeApp(firebaseConfig);

export default firebase;