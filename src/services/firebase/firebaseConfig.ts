// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcjYfHUkFZN-y7MIbtY5slj4tI9yX9v-M",
  authDomain: "cpfinal-7205f.firebaseapp.com",
  projectId: "cpfinal-7205f",
  storageBucket: "cpfinal-7205f.firebasestorage.app",
  messagingSenderId: "978915617622",
  appId: "1:978915617622:web:10775b3b09dc344c5744f7",
  measurementId: "G-2QWD6LDHV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {app, db, auth}