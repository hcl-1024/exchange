// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvl8g2EJNrE2EwxLFg2YiYHNvxTztBZsg",
  authDomain: "exchanges-5d935.firebaseapp.com",
  databaseURL: "https://exchanges-5d935-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "exchanges-5d935",
  storageBucket: "exchanges-5d935.appspot.com",
  messagingSenderId: "361489889256",
  appId: "1:361489889256:web:9942dff2985a994998d65d",
  measurementId: "G-SCT6V4SLGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);