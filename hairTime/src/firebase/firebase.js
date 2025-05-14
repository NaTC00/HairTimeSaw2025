/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRoKGj0Vw8zlmsODsAveiCRqqVVFmejUE",
  authDomain: "hairtimesaw2025.firebaseapp.com",
  projectId: "hairtimesaw2025",
  storageBucket: "hairtimesaw2025.firebasestorage.app",
  messagingSenderId: "332637776898",
  appId: "1:332637776898:web:df16459e6c714a9d7dcb1b",
  measurementId: "G-0PHZEKRY8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default {
  app,
  analytics,
  auth
}