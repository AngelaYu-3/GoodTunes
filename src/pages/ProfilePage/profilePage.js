import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import LogoutButton from '../../components/LogoutButton/logoutButton'
import './profilePage.css';

function ProfilePage({ setUser }) {
  const navigate = useNavigate();
  
  const user = {
    username: 'user xxx',
    profilePicture: 'https://i.pravatar.cc/150?img=5' // fun placeholder image
  };
  // function to handle navigation
  const goToAddSong = () => {
    navigate('/addSong');
  };
  

  // Handle Logout (simple redirect for now)
  const handleLogout = () => {
    // you could clear auth tokens here
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <h1>Welcome to Your Profile!</h1>

      <div className="profile-info">
        <img
          src={user.profilePicture}
          alt="User"
          className="profile-picture"
        />
        <h2>{user.username}</h2>
      </div>

      <Button className="profile-button" onClick={goToAddSong}>
        Add Song
      </Button>

      <LogoutButton className="logout-button" />
    </div>
  );
}

export default ProfilePage;