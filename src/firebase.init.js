// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZWnTs0Lc6NXtgwqTDKcinw9kJhIgW2ok",
  authDomain: "twitter-clone-aa045.firebaseapp.com",
  projectId: "twitter-clone-aa045",
  storageBucket: "twitter-clone-aa045.appspot.com",
  messagingSenderId: "1036867756569",
  appId: "1:1036867756569:web:2636378c05130d5e3e0088",
  measurementId: "G-86GDH1W8K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;