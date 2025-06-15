
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, MessageCircle, Calendar, User as UserIcon, LogOut, Home } from 'lucide-react';
import { User } from '../types/user';
import ChatAgent from './ChatAgent';
import BookFlight from './BookFlight';
import MyFlights from './MyFlights';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = 'home' | 'chat' | 'book' | 'flights';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatAgent user={user} />;
      case 'book':
        return <BookFlight user={user} />;
      case 'flights':
        return <MyFlights user={user} />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {user.firstName}!
              </h2>
              <p className="text-gray-600">Ready for your next adventure?</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveTab('chat')}>
                <CardHeader className="text-center">
                  <MessageCircle size={48} className="mx-auto mb-2" />
                  <CardTitle>Chat with Agent</CardTitle>
                  <CardDescription className="text-blue-100">
                    Get instant help with your travel needs
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveTab('book')}>
                <CardHeader className="text-center">
                  <Plane size={48} className="mx-auto mb-2" />
                  <CardTitle>Book a Flight</CardTitle>
                  <CardDescription className="text-sky-100">
                    Find and book your perfect flight
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveTab('flights')}>
                <CardHeader className="text-center">
                  <Calendar size={48} className="mx-auto mb-2" />
                  <CardTitle>My Flights</CardTitle>
                  <CardDescription className="text-indigo-100">
                    View and manage your bookings
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Flights Booked</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">Cities Visited</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">2</div>
                    <div className="text-sm text-gray-600">Upcoming Trips</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">Gold</div>
                    <div className="text-sm text-gray-600">Member Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-gradient rounded-full flex items-center justify-center">
                <Plane size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-sky-gradient bg-clip-text text-transparent">
                FlyZone
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <UserIcon size={20} />
                <span>{user.firstName} {user.lastName}</span>
              </div>
              <Button 
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-gray-50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          <Button
            onClick={() => setActiveTab('home')}
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'home' ? 'bg-sky-gradient text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            <Home size={16} className="mr-2" />
            Dashboard
          </Button>
          <Button
            onClick={() => setActiveTab('chat')}
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'chat' ? 'bg-sky-gradient text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            <MessageCircle size={16} className="mr-2" />
            Chat Agent
          </Button>
          <Button
            onClick={() => setActiveTab('book')}
            variant={activeTab === 'book' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'book' ? 'bg-sky-gradient text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            <Plane size={16} className="mr-2" />
            Book Flight
          </Button>
          <Button
            onClick={() => setActiveTab('flights')}
            variant={activeTab === 'flights' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'flights' ? 'bg-sky-gradient text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            <Calendar size={16} className="mr-2" />
            My Flights
          </Button>
        </div>

        {/* Content */}
        <div className="animate-fade-in-up">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
