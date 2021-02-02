import { firebase } from "@firebase/app"

require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyD_LYr2gwSUFt1jGQWI7KCVa2ncw1HxiJE",
  authDomain: "evernote-rep.firebaseapp.com",
  projectId: "evernote-rep",
  storageBucket: "evernote-rep.appspot.com",
  messagingSenderId: "320210903274",
  appId: "1:320210903274:web:bae74e1b862a98933ef793",
  measurementId: "G-X8V1V4HSM7",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
