import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import LogoutButton from '../../components/LogoutButton/logoutButton'
import './addSongPage.css';

function AddSongPage() {
  const navigate = useNavigate();
  
  // function to handle navigation
  const goToAddSong = () => {
    navigate('/login');
  };
  
  return (
    <div className="addSong-page">
      <h1>Add Song Page</h1>
      <LogoutButton className="profile-logout-button" />
      <Button to={"/login"}>Go Back to LogIn</Button>
    </div>
  );
}

export default AddSongPage;