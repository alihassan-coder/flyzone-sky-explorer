import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plane, Search } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Flight } from "@/types/user";
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const BookFlight: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState('1');
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // For now, simulate search results
      // In a real implementation, we would call the API
      // const results = await api.searchFlights(from, to, date, parseInt(passengers), token);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for now
      const mockResults: Flight[] = [
        {
          id: '1',
          destination: to,
          departure: from,
          date: date ? format(date, 'yyyy-MM-dd') : '',
          time: '08:00 AM',
          seat: 'Economy',
          price: 299.99
        },
        {
          id: '2',
          destination: to,
          departure: from,
          date: date ? format(date, 'yyyy-MM-dd') : '',
          time: '12:30 PM',
          seat: 'Economy',
          price: 349.99
        },
        {
          id: '3',
          destination: to,
          departure: from,
          date: date ? format(date, 'yyyy-MM-dd') : '',
          time: '16:45 PM',
          seat: 'Business',
          price: 599.99
        },
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Error searching flights:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search flights",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookFlight = (flight: Flight) => {
    // In a real implementation, we would call the API to book the flight
    toast({
      title: "Flight Booked",
      description: `Your flight from ${flight.departure} to ${flight.destination} on ${flight.date} has been booked!`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-sky-gradient text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Plane size={24} />
            <span>Book a Flight</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Input 
                  id="from" 
                  placeholder="Departure City" 
                  value={from} 
                  onChange={(e) => setFrom(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input 
                  id="to" 
                  placeholder="Destination City" 
                  value={to} 
                  onChange={(e) => setTo(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passengers">Passengers</Label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-sky-gradient hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span> Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search size={16} className="mr-2" /> Search Flights
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {searchResults.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Available Flights</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((flight) => (
                <div key={flight.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{flight.departure} to {flight.destination}</p>
                    <p className="text-sm text-gray-500">{flight.date} • {flight.time}</p>
                    <p className="text-sm">{flight.seat} Class</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${flight.price.toFixed(2)}</p>
                    <Button 
                      onClick={() => handleBookFlight(flight)} 
                      className="mt-2 bg-sky-gradient hover:opacity-90"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookFlight;
