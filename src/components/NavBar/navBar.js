// Navbar.js
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { logoutUser } from '../../firebase'; // Your Firebase auth instance
import './navBar.css';

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      // document.querySelector('.profile-page').classList.add('page-exit');
      // Sign out from Firebase
      await logoutUser();
      
      // Clear localStorage
      localStorage.removeItem('userId');
      
      // Redirect to login page
      window.location.reload();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <NavLink to="/" className="logo">
            GoodTunes
          </NavLink>
        </div>
        <div className="nav-buttons">
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              isActive ? "nav-button active" : "nav-button"
            }
          >
            Profile
          </NavLink>
          <NavLink 
            to="/addSong" 
            className={({ isActive }) => 
              isActive ? "nav-button active" : "nav-button"
            }
          >
            Add Song
          </NavLink>
          {/* Use NavLink instead of button for consistent styling */}
          <NavLink 
            to="/login" 
            className="nav-button"
            onClick={handleLogout}
          >
            Log Out
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;