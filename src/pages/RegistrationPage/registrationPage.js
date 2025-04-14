import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import './registrationPage.css';

function AddSongPage() {
  const navigate = useNavigate();
  
  // function to handle navigation
  const goToAddSong = () => {
    navigate('/register');
  };
  
  return (
    <div className="addSong-page">
      <h1>Register Page</h1>

      <Button to={"/login"}>Go Back to LogIn</Button>
    </div>
  );
}

export default AddSongPage;