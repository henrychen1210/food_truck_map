// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// add by henry
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// end

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI_7KqEeONkcovjH4wqolXr107ar78f5E",
  authDomain: "food-truck-7750f.firebaseapp.com",
  projectId: "food-truck-7750f",
  storageBucket: "food-truck-7750f.appspot.com",
  messagingSenderId: "671977402467",
  appId: "1:671977402467:web:f21ab00e094ece8756c856",
  measurementId: "G-CCEMTJLGPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// add by henry
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
// end