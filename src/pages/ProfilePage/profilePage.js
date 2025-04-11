import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';

function ProfilePage() {
  // This hook gives you a navigate function
  const navigate = useNavigate();
  
  // Function to handle navigation
  const goToAddSong = () => {
    navigate('/addSong');
  };
  
  return (
    <div className="profile-page">
      <h1>Profile Page</h1>

      <Button to={"/addSong"}>Go to Add Song</Button>
    </div>
  );
}

export default ProfilePage;