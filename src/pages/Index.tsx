
import React, { useState } from 'react';
import AuthPage from '../components/AuthPage';
import Dashboard from '../components/Dashboard';
import { User } from '../types/user';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(true);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsRegistering(true);
  };

  if (currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <AuthPage 
      isRegistering={isRegistering}
      setIsRegistering={setIsRegistering}
      onLogin={handleLogin}
    />
  );
};

export default Index;
