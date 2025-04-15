import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import './loginPage.css';
import { loginUser, getCurrentUser } from '../../firebase'

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // check if user is already logged in on component mount
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          // user is already logged in, redirect to profile
          navigate('/profile');
        }
      } catch (error) {
        console.error("auth state check error: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [navigate]);

  // function to handle login submission w/ authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // login successful
        console.log('login successful: ', result.userData);
        navigate('/profile');
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
  }
  
  return (
    <div className="login-page">
      <div className="login-form-container">
        {loading && !error ? (
          <div className="loading">Loading...</div>
        ) : (
          <form on Submit={handleSubmit}>
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
              placeholder="password"
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
        )}      
      </div>
    </div>
  );
}

export default LoginPage;