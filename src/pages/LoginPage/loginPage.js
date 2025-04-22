import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import './loginPage.css';
import { loginUser, getCurrentUser } from '../../firebase'

function LoginPage({ setUser }) {
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
  
  return (
    <div className="login-page">
      <div className="login-form-container">
          <form onSubmit={handleSubmit}>
            <div className="enter-email">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />            
            </div>

            <div className="enter-password">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="forgot-password">
              <a href="/forgot-password" class="forgot-password-link">
                Forgot Password?
              </a>
            </div>

            {error && <div className="error-message">{error}</div>}

            <Button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </Button>

            <div className="register">
              <a href="/register">
                CREATE AN ACCOUNT
              </a>
            </div>
          </form>     
      </div>
    </div>
  );
}

export default LoginPage;