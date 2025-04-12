import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/loginPage'; 
import ProfilePage from './pages/ProfilePage/profilePage';
import AddSongPage from './pages/AddSongPage/addSongPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addSong" element={<AddSongPage />} />
      </Routes>
    </Router>
  );
}

export default App;

/*import React, { useEffect, useState } from "react";
import cong from "./configuration"; // This imports your configuration
import { getDatabase, ref, onValue } from "firebase/database";

function App() {
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Initialize the Firebase database with your configuration
    const database = getDatabase(cong);
    
    // Reference to the songs collection
    const songsRef = ref(database, "songs");
    
    // Function to fetch songs
    const fetchSongs = () => {
      onValue(songsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const songsList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setSongs(songsList);
        }
      });
    };
    
    // Reference to the users collection
    const usersRef = ref(database, "users");
    
    // Function to fetch users
    const fetchUsers = () => {
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const usersList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setUsers(usersList);
        }
      });
    };
    
    // Fetch data when the component mounts
    fetchSongs();
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Good Tunes App</h1>
      
      <h2>Songs:</h2>
      <div className="songs-container">
        {songs.map(song => (
          <div key={song.id} className="song-card">
            <h3>{song.title}</h3>
            <p>Artist: {song.artist}</p>
          </div>
        ))}
      </div>
      
      <h2>Users:</h2>
      <div className="users-container">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <p>Name: {user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;*/