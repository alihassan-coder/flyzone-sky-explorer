
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Plane } from 'lucide-react';
import { User } from '../types/user';

interface BookFlightProps {
  user: User;
}

const BookFlight: React.FC<BookFlightProps> = ({ user }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    passengers: '1'
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate search
    setTimeout(() => {
      const mockResults = [
        {
          id: '1',
          airline: 'FlyZone Airways',
          departure: '08:30',
          arrival: '11:45',
          duration: '3h 15m',
          price: 299,
          stops: 'Direct'
        },
        {
          id: '2',
          airline: 'Sky Connect',
          departure: '14:20',
          arrival: '18:10',
          duration: '3h 50m',
          price: 259,
          stops: '1 Stop'
        },
        {
          id: '3',
          airline: 'AirLine Pro',
          departure: '19:15',
          arrival: '22:30',
          duration: '3h 15m',
          price: 329,
          stops: 'Direct'
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleBookFlight = (flightId: string) => {
    alert(`Flight ${flightId} booked successfully! Check your bookings in "My Flights".`);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-sky-gradient text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Plane size={24} />
            <span>Search Flights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from" className="flex items-center space-x-2 text-gray-700">
                  <MapPin size={16} />
                  <span>From</span>
                </Label>
                <Input
                  id="from"
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  placeholder="Departure city"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="to" className="flex items-center space-x-2 text-gray-700">
                  <MapPin size={16} />
                  <span>To</span>
                </Label>
                <Input
                  id="to"
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  placeholder="Destination city"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departure" className="flex items-center space-x-2 text-gray-700">
                  <Calendar size={16} />
                  <span>Departure Date</span>
                </Label>
                <Input
                  id="departure"
                  type="date"
                  value={searchData.departure}
                  onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="passengers" className="flex items-center space-x-2 text-gray-700">
                  <Users size={16} />
                  <span>Passengers</span>
                </Label>
                <Select value={searchData.passengers} onValueChange={(value) => setSearchData({...searchData, passengers: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-sky-gradient hover:opacity-90 transition-all duration-300"
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search Flights'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Available Flights</h3>
          {searchResults.map((flight) => (
            <Card key={flight.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg text-gray-800">{flight.airline}</h4>
                      <span className="text-sm text-gray-600">{flight.stops}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">{flight.departure}</div>
                        <div className="text-sm">{searchData.from}</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-sm text-gray-500">{flight.duration}</div>
                        <div className="border-t border-gray-300 my-1"></div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">{flight.arrival}</div>
                        <div className="text-sm">{searchData.to}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-center">
                    <div className="text-2xl font-bold text-green-600">${flight.price}</div>
                    <Button 
                      onClick={() => handleBookFlight(flight.id)}
                      className="mt-2 bg-sky-gradient hover:opacity-90"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-flyzone-blue"></div>
          <p className="mt-2 text-gray-600">Searching for the best flights...</p>
        </div>
      )}
    </div>
  );
};

export default BookFlight;
