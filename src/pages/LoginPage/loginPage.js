import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';

function LoginPage() {
  // This hook gives you a navigate function
  const navigate = useNavigate();
  
  // Function to handle navigation
  const goToProfile = () => {
    navigate('/profile');
  };
  
  return (
    <div className="login-page">
      <h1>Login Page</h1>

      <Button to={"/profile"}>Go to Profile</Button>
    </div>
  );
}

export default LoginPage;