// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuDAlahxPSBiB-jmTJL3mQj83wwFi-CGM",
  authDomain: "fundingpips-defab.firebaseapp.com",
  projectId: "fundingpips-defab",
  storageBucket: "fundingpips-defab.firebasestorage.app",
  messagingSenderId: "119817353936",
  appId: "1:119817353936:web:a0a8fab7e8154409ddbcd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app); 
export const auth = getAuth(app);