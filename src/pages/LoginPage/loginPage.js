import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button'; // Assuming Button component is styled properly
import './loginPage.css';
import { loginUser, getCurrentUser } from '../../firebase'

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
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

=======
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // function to handle login submission w/ authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        // login successful
        localStorage.setItem('userId', result.userData.uid);
        console.log('login successful');
        //window.location.reload();
        setUser(result.userData);
        navigate('/profile', { replace: true, state: { time: Date.now() } });
        //navigate('/profile');
      } else {
        // login failed
        setError(result.error || 'Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error: ', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
>>>>>>> 80941917dcf11a14aecb2ee581f37ee1edb115ab
  return (
    <div className="login-page">
      <div className = "logo">
        <h1>GoodTunes</h1>
      </div>
      <div className="login-form-container">
<<<<<<< HEAD
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
=======
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />            
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <Button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="login-links">
              <a href="/register">Create Account</a>
              <a href="/forgot-password">Forgot Password</a>
            </div>
          </form>     
>>>>>>> 80941917dcf11a14aecb2ee581f37ee1edb115ab
      </div>
    </div>
  );
}

export default LoginPage;
