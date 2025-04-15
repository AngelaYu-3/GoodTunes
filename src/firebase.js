// doc for SDKs for Firebase products that can use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
// firebase auth imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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


// ***** web app's Firebase configuration *****
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


// ***** initialize Firebase *****
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


// ***** user authentication functions *****
// register a new user
export const registerUser = async (username, email, password) => {
  try {
    // create user in firebase authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // save additional user information in database
    await set(ref(database, `users/${user.uid}`), {
      username: username,
      email: email,
      createdAt: new Date().toISOString()
    });

    return { success: true, userId: user.uid};
  } catch (error) {
    console.error("registration error: ", error);
    return { success: false, error: error.message};
  }
};

// login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // get user profile information
    const userSnapshot = await get(ref(database, `users/${user.uid}`));
    const userData = userSnapshot.exists() ? userSnapshot.val() : {};
  } catch (error) {
    console.error("Loging error: ", error);
    return { success: false, error: error.message };
  }
};

// get current user
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();

      if (user) {
        // get user profile data
        const snapshot = await get(ref(database, `users/${user.uid}`));
        const userData = snapshot.exists() ? snapshot.val() : {};

        resolve({
         uid: user.uid,
          email: user.email,
          ...userData
        });
      } else {
        resolve(null);
      }
    });
  });
};

// logout user
export const logoutUser = () => {
  return signOut(auth);
};


// ****** song functions ******
// add a song to a user's collection
export const addSongToUser = async (userId, songId) => {
  try {
    await set(ref(database, `user_songs/${userId}/${songId}`), true);
    return { success: true };
  } catch (error) {
    console.error("Error adding song to user: ", error);
    return { success: false, error: error.message };
  }
};

// remove a song from a user's collection
export const removeSongFromUser = async (userId, songId) => {
  try {
    await remove(ref(database, `user_songs/${userId}/${songId}`));
    return { success: true };
  } catch (error) {
    console.error("Error removing song from user: ", error);
    return { success: false, error: error.message };
  }
};

// get all songs from a user's collection
export const getUserSongs = async (userId) => {
  try {
    // get song IDs from user_songs
    const userSnapshot = await get(ref(database, `user_songs/${userId}`));

    if (!userSnapshot.exists()) {
      return { success: true, songs: [] };
    }

    const songIds = Object.keys(userSnapshot.val());

    // get details for each song
    const songs = [];

    for (const songId of songIds) {
      const songSnapshot = await get(ref(database, `songs/${songId}`));

      if (songSnapshot.exists()) {
        songs.push({
          id: songId,
          ...songSnapshot.val()
        });
      }
    }

    return { success: true, songs };
  } catch (error) {
    console.error("Error getting user songs: ", error);
    return { success: false, error: error.message, songs: [] };
  }
};

// create a new song
export const createSong = async (title, artist) => {
  try {
    const songRef = ref(database, `songs/${Date.now()}`);
    await set(songRef, {
      title,
      artist,
      createdAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating song: ", error);
    return { success: false, error: error.message };
  }
};


export default {
  app,
  auth,
  database,
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  addSongToUser,
  removeSongFromUser,
  getUserSongs,
  createSong
};
