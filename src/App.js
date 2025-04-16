import React, { useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/loginPage'; 
import RegistrationPage from './pages/RegistrationPage/registrationPage';
import ProfilePage from './pages/ProfilePage/profilePage';
import AddSongPage from './pages/AddSongPage/addSongPage';
import { getCurrentUser } from './firebase'; // Import your getCurrentUser function
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Starting auth check");
      try {
        const currentUser = await getCurrentUser();
        console.log("Auth check result:", currentUser);
        if (currentUser) {
          // User is logged in
          localStorage.setItem('userId', currentUser.uid);
          setUser(currentUser);
          // console.log("User authenticated:", currentUser.uid);
        } else {
          // console.log("No user found");
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        // console.log("Setting loading to false");
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);

  if (loading) {
    // Show a loading spinner or screen while checking auth
    return <div className="App-loading"></div>;
  }

  // console.log("Rendering with state:", { loading, user });

  return (
    <Router>
      <Routes>
        {/* Redirect root to profile if logged in, otherwise to login */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} 
        />
        
        {/* For login and register, redirect to profile if already logged in */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/profile" replace /> : <LoginPage setUser={setUser}/>} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/profile" replace /> : <RegistrationPage setUser={setUser}/>} 
        />
        
        {/* For protected routes, redirect to login if not logged in */}
        <Route
          path="/profile"
          element={user ? <ProfilePage setUser={setUser}/> : <Navigate to="/login" replace />}
        />
        <Route
          path="/addSong"
          element={user ? <AddSongPage setUser={setUser}/> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;