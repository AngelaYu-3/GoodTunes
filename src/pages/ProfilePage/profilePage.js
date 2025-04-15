import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import LogoutButton from '../../components/LogoutButton/logoutButton'
import './profilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  
  // function to handle navigation
  const goToAddSong = () => {
    navigate('/addSong');
  };
  
  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <LogoutButton className="profile-logout-button" />

      <Button to={"/addSong"}>Go to Add Song</Button>
    </div>
  );
}

export default ProfilePage;