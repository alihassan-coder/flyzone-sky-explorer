
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, CloudSun } from 'lucide-react';
import { User } from '../types/user';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      // Simulate registration
      const newUser: User = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      };
      onLogin(newUser);
    } else {
      // Simulate login
      const user: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email
      };
      onLogin(user);
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
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-sky-gradient hover:opacity-90 transition-all duration-300 text-white font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isRegistering ? 'Create Account' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="ml-2 text-flyzone-blue hover:text-flyzone-blue-light font-semibold transition-colors duration-200"
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
