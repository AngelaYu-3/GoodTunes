// doc for SDKs for Firebase products that can use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
// firebase auth imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailaAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
// firebase realtime database imports
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove
} from "firebase/database";


// web app's Firebase configuration
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


// initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export default cong;
