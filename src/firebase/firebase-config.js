import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDbTbd5l22rnEKCNlocLa_zGqSfSq9N9SY",
    authDomain: "react-app-udemy-6905f.firebaseapp.com",
    projectId: "react-app-udemy-6905f",
    storageBucket: "react-app-udemy-6905f.appspot.com",
    messagingSenderId: "1055189561904",
    appId: "1:1055189561904:web:47690dde184168b84033f5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}