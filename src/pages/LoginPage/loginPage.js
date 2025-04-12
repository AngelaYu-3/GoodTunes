import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import './loginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // function to handle navigation
  const goToProfile = () => {
    navigate('/profile');
  };

  // function to handle login submission 
  // fix later to deal with authentication w/ firebase--function needs to be asynchronous
  const handleSubmit = (e) => {
    e.preventDefault();

    // handle authentication here
    console.log('Login attempt with:', username, password);
    goToProfile();
  }
  
  return (
    <div className="login-page">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          
          <Button type="submit" className="login-button">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;