// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIJ1WUQ9ltHyR2QFxwotb2DeG5_l_gVVM",
  authDomain: "goodtunes-a3468.firebaseapp.com",
  databaseURL: "https://goodtunes-a3468-default-rtdb.firebaseio.com",
  projectId: "goodtunes-a3468",
  storageBucket: "goodtunes-a3468.firebasestorage.app",
  messagingSenderId: "911990609117",
  appId: "1:911990609117:web:cc63cdd34868040b947734",
  measurementId: "G-XV8B0HH18N"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
export default cong;
const analytics = getAnalytics(cong);