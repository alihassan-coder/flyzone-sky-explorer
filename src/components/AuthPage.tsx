
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, CloudSun } from 'lucide-react';
import { User } from '../types/user';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface AuthPageProps {
  isRegistering: boolean;
  setIsRegistering: (value: boolean) => void;
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ isRegistering, setIsRegistering, onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isRegistering) {
        // Register new user
        const response = await api.register({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password
        });
        
        // After successful registration, automatically log in
        const loginResponse = await api.login({
          email: formData.email,
          password: formData.password
        });
        
        // Save token to localStorage
        localStorage.setItem('token', loginResponse.access_token || '');
        
        // Create user object
        const newUser: User = {
          id: response.uuid || Date.now().toString(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email
        };
        
        toast({
          title: "Success",
          description: "Account created successfully!"
        });
        
        onLogin(newUser);
      } else {
        // Login existing user
        const response = await api.login({
          email: formData.email,
          password: formData.password
        });
        
        // Save token to localStorage
        localStorage.setItem('token', response.access_token || '');
        
        // For now, we don't have user details in the login response
        // So we'll create a user object with the email and placeholder values
        // In a real app, you would make another API call to get user details
        const user: User = {
          id: '1', // This would come from the API in a real app
          firstName: 'User', // This would come from the API in a real app
          lastName: '', // This would come from the API in a real app
          email: formData.email
        };
        
        toast({
          title: "Success",
          description: "Logged in successfully!"
        });
        
        onLogin(user);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Authentication failed",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 text-flyzone-sky opacity-20">
          <CloudSun size={60} className="animate-float" />
        </div>
        <div className="absolute top-40 right-20 text-flyzone-blue opacity-20">
          <CloudSun size={40} className="animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 left-20 text-flyzone-sky-light opacity-20">
          <CloudSun size={50} className="animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Flying plane animation */}
      <div className="absolute top-1/4">
        <Plane size={30} className="text-flyzone-blue opacity-30 animate-fly-across" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo and brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-gradient rounded-full mb-4 animate-pulse-blue">
              <Plane size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-sky-gradient bg-clip-text text-transparent">
              FlyZone
            </h1>
            <p className="text-gray-600 mt-2">Your journey begins here</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {isRegistering 
                  ? 'Join FlyZone and start your adventure' 
                  : 'Sign in to access your flights'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegistering && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-flyzone-blue focus:ring-flyzone-blue"
                          placeholder="John"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-flyzone-blue focus:ring-flyzone-blue"
                          placeholder="Doe"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 border-gray-300 focus:border-flyzone-blue focus:ring-flyzone-blue"
                    placeholder="john@example.com"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 border-gray-300 focus:border-flyzone-blue focus:ring-flyzone-blue"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-sky-gradient hover:opacity-90 transition-all duration-300 text-white font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="ml-2 text-flyzone-blue hover:text-flyzone-blue-light font-semibold transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {isRegistering ? 'Sign In' : 'Create Account'}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
