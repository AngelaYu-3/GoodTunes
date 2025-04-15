import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import './registrationPage.css';
import { registerUser, getCurrentUser } from '../../firebase';

function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // check if user is already logged in
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          navigate('/profile');
        }
      } catch (error) {
        console.error("Auth state check error: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // basic validation
    if (password != confirmPassword) {
      setError('passwords do not match');
    }

    setLoading(true);

    try {
      const result = await registerUser(username, email, password);

      if (result.success) {
        console.log('registration successful');
        navigate('/profile');
      } else {
        setError(result.error || 'Registratoin failed. Please try again.');
      }
    } catch (error) {
      console.log('registration error: ', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="registration-page">
      <div className="registration-form-container">
        {loading && !error ? (
          <div className="loading">Loading...</div>
        ) : (
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
            
            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <Button 
              type="submit" 
              className="register-button" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <div className="login-link">
              Already have an account? <a href="/login">Log In</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegistrationPage;