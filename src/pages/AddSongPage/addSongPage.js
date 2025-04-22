import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import Navbar from '../../components/NavBar/navBar';
import { getCurrentUser } from '../../firebase';
import { getDatabase, ref, set } from 'firebase/database';
import './addSongPage.css';

function AddSongPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  
  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setUser(currentUser);
    };
    
    checkUser();
  }, [navigate]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.artist) {
      setError('Please enter both title and artist');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Get database reference
      const database = getDatabase();
      
      // Generate a timestamp for the song ID
      const timestamp = Date.now().toString();
      
      // Debug info
      const debug = {
        timestamp,
        songDataPath: `songs/${timestamp}`,
        userSongsPath: `user_songs/${user.uid}/${timestamp}`,
        songData: {
          title: formData.title,
          artist: formData.artist,
          createdAt: new Date().toISOString()
        }
      };
      setDebugInfo(debug);
      
      // Step 1: Save the song in the songs collection
      console.log('Saving song:', debug.songDataPath, debug.songData);
      await set(ref(database, debug.songDataPath), debug.songData);
      console.log('Song saved successfully');
      
      // Step 2: Associate the song with the user
      console.log('Associating song with user:', debug.userSongsPath);
      await set(ref(database, debug.userSongsPath), true);
      console.log('Song associated with user successfully');
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        artist: ''
      });
      
      // Automatically redirect to profile after delay
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding song:', error);
      setError(`Failed to add song: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Navigate to profile page
  const goToProfile = () => {
    navigate('/profile');
  };

    // Show loading state
    if (loading) {
      return (
        <div className="profile-container">
          <Navbar />
          <div className="profile-page">
            <p>Loading...</p>
          </div>
        </div>
      );
    }
  
  return (
    <div className="addsong-container">
      <Navbar />
      
      <div className="addSong-page">
        <h1>Add Song</h1>
        
        {success ? (
          <div className="success-message">
            <p>Song added successfully!</p>
            <p>Redirecting to your profile...</p>
          </div>
        ) : (
          <div className="song-form-container">
            {error && <div className="error-message">{error}</div>}
            
            <form className="song-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="song-label" htmlFor="title">Song Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter song title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="artist-label" htmlFor="artist">Artist</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  placeholder="Enter artist name"
                  required
                />
              </div>
              
              <div className="form-buttons">
                <Button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Song'}
                </Button>
                
                <Button 
                  type="button" 
                  className="cancel-button" 
                  onClick={goToProfile}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddSongPage;