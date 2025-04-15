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
  const [loading, setLoading] = useState(false);

  // function to handle login submission w/ authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result && result.success) {
        // login successful
        console.log('login successful: ', result.userData);
        localStorage.setItem('userId', result.userData.uid);
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
  };
  
  return (
    <div className="login-page">
      <div className="login-form-container">
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
      </div>
    </div>
  );
}

export default LoginPage;