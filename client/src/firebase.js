import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDs34YNnENisdt1HHxQU5jZmaGtSA1Uov8",
  authDomain: "fir-a2d57.firebaseapp.com",
  projectId: "fir-a2d57",
  storageBucket: "fir-a2d57.appspot.com",
  messagingSenderId: "68324073518",
  appId: "1:68324073518:web:d0d572277daa692d543fbf",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
