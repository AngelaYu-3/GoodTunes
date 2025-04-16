import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import LogoutButton from '../../components/LogoutButton/logoutButton'
import './profilePage.css';

function ProfilePage({ setUser }) {
  const navigate = useNavigate();

  // Simulated user info (you'll replace this with real data later)
  const user = {
    username: 'user xxx',
    profilePicture: 'https://i.pravatar.cc/150?img=5' // fun placeholder image
  };

  // Go to Add Song page
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
<<<<<<< HEAD
      <h1>Welcome to Your Profile! 🌟</h1>

      <div className="profile-info">
        <img
          src={user.profilePicture}
          alt="User"
          className="profile-picture"
        />
        <h2>{user.username}</h2>
      </div>

      <Button className="profile-button" onClick={goToAddSong}>
        Add Song 🎶
      </Button>

      <button className="logout-button" onClick={handleLogout}>
        Logout 🚪
      </button>
=======
      <h1>Profile Page</h1>
      <LogoutButton className="profile-logout-button" />
      <Button to={"/addSong"}>Go to Add Song</Button>
>>>>>>> 80941917dcf11a14aecb2ee581f37ee1edb115ab
    </div>
  );
}

export default ProfilePage;
