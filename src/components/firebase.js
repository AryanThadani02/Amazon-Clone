/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyBgNcLALS0zgwLwsRg-Sbmil7-kUxNYOUA",
  authDomain: "clone-817bb.firebaseapp.com",
  projectId: "clone-817bb",
  storageBucket: "clone-817bb.appspot.com",
  messagingSenderId: "817323826241",
  appId: "1:817323826241:web:a1a79f1da9af013eadfac0"
};
 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 
export const auth = getAuth(app);









