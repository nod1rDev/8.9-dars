// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ8hegZxyAzBxswx7sEiZjGTbAnXpXUaU",
  authDomain: "fn12-9f6ea.firebaseapp.com",
  projectId: "fn12-9f6ea",
  storageBucket: "fn12-9f6ea.appspot.com",
  messagingSenderId: "976509114714",
  appId: "1:976509114714:web:90ae19a14cf4daf8f33b63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
