import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../firebase'; // Your Firebase auth instance
import Button from '../Button/button'; // Reuse your existing Button component

function LogoutButton({ className }) {
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
    <Button 
      onClick={handleLogout}
      className={className}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;