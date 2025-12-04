// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMtm6oaTH01qeHlOys_8Uo3GpK7Kkm_VA",
  authDomain: "funding-pips-115ab.firebaseapp.com",
  projectId: "funding-pips-115ab",
  storageBucket: "funding-pips-115ab.firebasestorage.app",
  messagingSenderId: "750555735104",
  appId: "1:750555735104:web:fa2714915e3d70fcb36ba5",
  measurementId: "G-K6CRGEG5JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);