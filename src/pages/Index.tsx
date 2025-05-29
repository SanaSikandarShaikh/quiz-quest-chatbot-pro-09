
import React, { useState, useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';
import RegistrationPage from '../components/RegistrationPage';
import LoginPage from '../components/LoginPage';

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Check if user is already registered and logged in
    const registeredUser = localStorage.getItem('registeredUser');
    const loginSession = sessionStorage.getItem('loginSession');
    
    if (registeredUser) {
      setIsRegistered(true);
      if (loginSession) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    setShowLogin(true); // Show login after registration
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Store login session
    sessionStorage.setItem('loginSession', JSON.stringify({
      timestamp: new Date().toISOString(),
      email: JSON.parse(localStorage.getItem('registeredUser') || '{}').email
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loginSession');
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  const handleSwitchToRegister = () => {
    setShowLogin(false);
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  // If not registered, show registration
  if (!isRegistered) {
    return <RegistrationPage onRegistrationSuccess={handleRegistrationSuccess} />;
  }

  // If registered but not logged in, show login or registration
  if (!isLoggedIn) {
    if (showLogin) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchToRegister={handleSwitchToRegister} />;
    } else {
      return <RegistrationPage onRegistrationSuccess={handleRegistrationSuccess} />;
    }
  }

  // If both registered and logged in, show chat interface
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg font-medium"
        >
          Logout
        </button>
      </div>
      <ChatInterface />
    </div>
  );
};

export default Index;
