
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { User } from '../types/user';

interface ChatAgentProps {
  user: User;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const ChatAgent: React.FC<ChatAgentProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${user.firstName}! I'm your FlyZone assistant. How can I help you today?`,
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(newMessage),
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const getAgentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('book') || lowerMessage.includes('flight')) {
      return "I'd be happy to help you book a flight! You can use our flight booking feature to search for available flights. What destination are you interested in?";
    } else if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return "For cancellations and refunds, please check your booking details in the 'My Flights' section. Most tickets can be cancelled up to 24 hours before departure.";
    } else if (lowerMessage.includes('baggage') || lowerMessage.includes('luggage')) {
      return "For baggage information: Carry-on is included with all tickets. Checked baggage fees vary by destination. Would you like specific information for your upcoming flight?";
    } else if (lowerMessage.includes('check-in') || lowerMessage.includes('checkin')) {
      return "Online check-in opens 24 hours before your flight. You can check in through our website or mobile app. Don't forget to have your booking reference ready!";
    } else {
      return "Thank you for your message! I'm here to help with flights, bookings, check-ins, baggage, and any other travel-related questions. What would you like to know?";
    }
  };

  return (
    <Card className="h-[600px] flex flex-col border-0 shadow-lg">
      <CardHeader className="bg-sky-gradient text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Bot size={24} />
          <span>FlyZone Assistant</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {message.sender === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" className="bg-sky-gradient hover:opacity-90">
              <Send size={16} />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAgent;
