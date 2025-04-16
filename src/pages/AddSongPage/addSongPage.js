import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import LogoutButton from '../../components/LogoutButton/logoutButton'
import './addSongPage.css';

function AddSongPage() {
  const navigate = useNavigate();
  
  // function to handle navigation
  const goToProfile = () => {
    navigate('/profile');
  };
  
  return (
    <div className="addSong-page">
      <h1>Add Song Page</h1>
      <LogoutButton className="profile-logout-button" />
      <Button to={"/profile"}>Go To Profile</Button>
    </div>
  );
}

export default AddSongPage;