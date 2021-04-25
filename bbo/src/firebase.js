import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdMmrvZvhc5Kxbm6s_BehREDRzuMNxhs0",
    authDomain: "bbo-mini.firebaseapp.com",
    projectId: "bbo-mini",
    storageBucket: "bbo-mini.appspot.com",
    messagingSenderId: "1012915897172",
    appId: "1:1012915897172:web:794856a99c392203497ec1",
    measurementId: "G-X6Z38WKZKG"
  };



  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  
  const auth = firebase.auth();
  
  export { db, auth };