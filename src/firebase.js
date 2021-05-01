import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOayw7ij7ILGTOKQA5we42oD1Wz5fkJys",
    authDomain: "word-guesser-41a7f.firebaseapp.com",
    projectId: "word-guesser-41a7f",
    storageBucket: "word-guesser-41a7f.appspot.com",
    messagingSenderId: "299115939539",
    appId: "1:299115939539:web:7d51d30994d99dee4cb626",
    measurementId: "G-7PM50NQ7N8"
  };

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();
  export const auth = firebase.auth();