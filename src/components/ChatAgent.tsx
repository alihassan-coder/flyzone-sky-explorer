
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { User } from '../types/user';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
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
    setIsLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Send message to backend
      const response = await api.askAgent(newMessage, token);
      
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message from agent
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error 
          ? `Sorry, I encountered an error: ${error.message}` 
          : "Sorry, I'm having trouble connecting to the server right now. Please try again later.",
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from agent",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="bg-sky-gradient hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <Send size={16} />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAgent;
