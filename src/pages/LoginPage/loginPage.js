import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button'; // Assuming Button component is styled properly
import './loginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle navigation to profile after successful login
  const goToProfile = () => {
    navigate('/profile');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!username || !password) {
      setError("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would handle Firebase authentication or your own logic
      console.log('Logging in with:', username, password);
      goToProfile(); // On successful login
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        
        {/* Display error if any */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "15px",
                right: "10px",
                background: "transparent",
                border: "none",
                color: "#4a7c59",
                cursor: "pointer"
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="form-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
