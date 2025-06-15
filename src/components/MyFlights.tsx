import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, MapPin, Calendar, Clock, Armchair } from 'lucide-react';
import { User, Flight } from '../types/user';

interface MyFlightsProps {
  user: User;
}

const MyFlights: React.FC<MyFlightsProps> = ({ user }) => {
  // Mock flight data
  const upcomingFlights: Flight[] = [
    {
      id: '1',
      destination: 'Los Angeles',
      departure: 'New York',
      date: '2024-12-20',
      time: '08:30',
      seat: '12A',
      price: 450
    },
    {
      id: '2',
      destination: 'Miami',
      departure: 'Chicago',
      date: '2024-12-25',
      time: '14:20',
      seat: '8C',
      price: 320
    }
  ];

  const pastFlights: Flight[] = [
    {
      id: '3',
      destination: 'Paris',
      departure: 'New York',
      date: '2024-11-15',
      time: '22:45',
      seat: '15B',
      price: 680
    }
  ];

  const FlightCard = ({ flight, isPast = false }: { flight: Flight; isPast?: boolean }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-sky-gradient rounded-full flex items-center justify-center">
              <Plane size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {flight.departure} → {flight.destination}
              </h3>
              <p className="text-sm text-gray-600">Flight #{flight.id}</p>
            </div>
          </div>
          <Badge variant={isPast ? "secondary" : "default"} className={isPast ? "bg-gray-200 text-gray-700" : "bg-green-100 text-green-800"}>
            {isPast ? "Completed" : "Upcoming"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar size={16} />
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-medium">{new Date(flight.date).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={16} />
            <div>
              <div className="text-sm text-gray-500">Time</div>
              <div className="font-medium">{flight.time}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Armchair size={16} />
            <div>
              <div className="text-sm text-gray-500">Seat</div>
              <div className="font-medium">{flight.seat}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <div>
              <div className="text-sm text-gray-500">Price</div>
              <div className="font-medium text-green-600">${flight.price}</div>
            </div>
          </div>
        </div>

        {!isPast && (
          <div className="mt-4 flex space-x-2">
            <Button variant="outline" size="sm">
              Check In
            </Button>
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Flights</h2>
        <p className="text-gray-600">Manage your bookings and travel history</p>
      </div>

      {/* Upcoming Flights */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Plane size={20} className="mr-2 text-flyzone-blue" />
          Upcoming Flights ({upcomingFlights.length})
        </h3>
        {upcomingFlights.length > 0 ? (
          <div className="space-y-4">
            {upcomingFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Plane size={48} className="mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No upcoming flights</h4>
              <p className="text-gray-500">Book your next adventure today!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Flights */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin size={20} className="mr-2 text-gray-600" />
          Flight History ({pastFlights.length})
        </h3>
        {pastFlights.length > 0 ? (
          <div className="space-y-4">
            {pastFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} isPast={true} />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No flight history</h4>
              <p className="text-gray-500">Your completed flights will appear here</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Travel Stats */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-sky-50">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Travel Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {upcomingFlights.length + pastFlights.length}
              </div>
              <div className="text-sm text-gray-600">Total Flights</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${(upcomingFlights.reduce((sum, f) => sum + f.price, 0) + pastFlights.reduce((sum, f) => sum + f.price, 0)).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {new Set([...upcomingFlights, ...pastFlights].map(f => f.destination)).size}
              </div>
              <div className="text-sm text-gray-600">Cities Visited</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">Gold</div>
              <div className="text-sm text-gray-600">Status Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyFlights;
