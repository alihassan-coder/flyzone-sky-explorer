import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, MessageCircle, Calendar, User as UserIcon, LogOut, Home, Headset, Award, CalendarCheck, Bot } from 'lucide-react';
import { User } from '../types/user';
import ChatAgent from './ChatAgent';
// import BookFlight from './BookFlight';
import MyFlights from './MyFlights';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = 'home' | 'chat' | 'flights';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatAgent user={user} />;
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

            <div className="grid md:grid-cols-2 gap-6">
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

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100 to-white animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  Welcome to FlyZone
                  <Plane className="text-sky-500" size={32} />
                </CardTitle>
                <CardDescription className="mt-2 text-blue-700 text-base">
                  Your all-in-one platform for seamless travel planning, booking, and rewards. Enjoy a premium experience every time you fly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  {/* Personal Travel Agent */}
                  <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border border-blue-100 hover:border-blue-300 animate-in fade-in zoom-in-50">
                    <Bot className="text-sky-500 mb-2" size={40} />
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Personal Travel Agent</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Get instant help, personalized recommendations, and booking support from our smart AI agent.
                    </p>
                    <span className="inline-block bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-full">AI Powered</span>
                  </div>

                  {/* Bookings & Tracking */}
                  <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border border-blue-100 hover:border-blue-300 animate-in fade-in zoom-in-50 delay-100">
                    <CalendarCheck className="text-blue-500 mb-2" size={40} />
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Manage Your Trips</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Effortlessly view, track, and manage all your upcoming and past bookings in one place.
                    </p>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">All-in-One Dashboard</span>
                  </div>

                  {/* Rewards Program */}
                  <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border border-blue-100 hover:border-blue-300 animate-in fade-in zoom-in-50 delay-200">
                    <Award className="text-yellow-500 mb-2" size={40} />
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">FlyZone Rewards</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Earn miles, unlock Gold status, and enjoy exclusive perks as you travel more with us.
                    </p>
                    <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Gold Member Perks</span>
                  </div>

                  {/* 24/7 Support */}
                  <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border border-blue-100 hover:border-blue-300 animate-in fade-in zoom-in-50 delay-300">
                    <Headset className="text-green-500 mb-2" size={40} />
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">24/7 Support</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Our team is always here for you—before, during, and after your journey. Travel with peace of mind.
                    </p>
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Always Available</span>
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
