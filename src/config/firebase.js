import { firebase } from "@firebase/app"

require("firebase/firestore")

const API_KEY = process.env.REACT_APP_API_KEY
const APP_ID = process.env.REACT_APP_APP_ID

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "evernote-rep.firebaseapp.com",
  projectId: "evernote-rep",
  storageBucket: "evernote-rep.appspot.com",
  messagingSenderId: "320210903274",
  appId: APP_ID ,
  measurementId: "G-X8V1V4HSM7",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
