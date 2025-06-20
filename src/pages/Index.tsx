
import React, { useState, useEffect } from 'react';
import AuthPage from '../components/AuthPage';
import Dashboard from '../components/Dashboard';
import { User } from '../types/user';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsRegistering(true);
  };
  
  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // For now, we'll create a placeholder user
      // In a real app, you would make an API call to get user details using the token
      const user: User = {
        id: '1',
        firstName: 'User',
        lastName: '',
        email: 'user@example.com'
      };
      
      setCurrentUser(user);
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
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
