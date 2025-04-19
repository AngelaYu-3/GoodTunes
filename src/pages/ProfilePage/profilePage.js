import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import Navbar from '../../components/NavBar/navBar';
import { getCurrentUser, getUserSongs, removeSongFromUser } from '../../firebase';
import './profilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch current user and their songs when component mounts
  useEffect(() => {
    const fetchUserAndSongs = async () => {
      try {
        // Get current user
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          // Redirect to login if no user is logged in
          navigate('/login');
          return;
        }
        
        setUser(currentUser);
        
        // Get user's songs
        const { success, songs: userSongs } = await getUserSongs(currentUser.uid);
        if (success) {
          setSongs(userSongs);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAndSongs();
  }, [navigate]);
  
  // Function to navigate to Add Song page
  const goToAddSong = () => {
    navigate('/addSong');
  };
  
  // Function to remove a song from user's list
  const handleRemoveSong = async (songId) => {
    if (!user) return;
    
    try {
      const { success } = await removeSongFromUser(user.uid, songId);
      if (success) {
        // Update the songs list after removal
        setSongs(songs.filter(song => song.id !== songId));
      }
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };
  
  // Show loading state
  /*if (loading) {
    return (
      <div className="addsong-container">
        <Navbar />
        <div className="addsong-page">
          <p>Loading...</p>
        </div>
      </div>
    );
  }*/
  
  return (
    <div className="profile-container">
      <Navbar />
      
      <div className="profile-page">
        <h1>Welcome to Your Profile, {user?.username || 'User'}!</h1>
        
        {/* User information */}
        
        {/* User's songs list */}
        <div className="songs-container">
          <h2>Your Songs</h2>
          
          {songs.length === 0 ? (
            <p>You haven't added any songs yet. Click "Add Song" to get started!</p>
          ) : (
            <ul className="songs-list">
              {songs.map(song => (
                <li key={song.id} className="song-item">
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>Artist: {song.artist}</p>
                  </div>
                  <button 
                    className="remove-song-button" 
                    onClick={() => handleRemoveSong(song.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;