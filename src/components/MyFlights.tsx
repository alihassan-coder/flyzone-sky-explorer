import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Calendar, MapPin } from 'lucide-react';
import { Flight, User } from "@/types/user";
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface MyFlightsProps {
  user: User;
}

const MyFlights: React.FC<MyFlightsProps> = ({ user }) => {
  const [upcomingFlights, setUpcomingFlights] = useState<Flight[]>([]);
  const [pastFlights, setPastFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true);
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        // Fetch flights from API
        const flights = await api.getMyFlights(token);
        
        // Sort flights into upcoming and past based on date
        const today = new Date();
        const upcoming: Flight[] = [];
        const past: Flight[] = [];
        
        flights.forEach((flight: Flight) => {
          const flightDate = new Date(flight.date);
          if (flightDate >= today) {
            upcoming.push(flight);
          } else {
            past.push(flight);
          }
        });
        
        setUpcomingFlights(upcoming);
        setPastFlights(past);
      } catch (error) {
        console.error('Error fetching flights:', error);
        
        // For demo purposes, set mock data if API fails
        const mockUpcoming: Flight[] = [
          {
            id: '1',
            destination: 'Paris',
            departure: 'New York',
            date: '2023-12-15',
            time: '08:30 AM',
            seat: 'Business',
            price: 1299.99
          },
          {
            id: '2',
            destination: 'Tokyo',
            departure: 'Los Angeles',
            date: '2023-12-28',
            time: '11:45 AM',
            seat: 'Economy',
            price: 899.99
          }
        ];
        
        const mockPast: Flight[] = [
          {
            id: '3',
            destination: 'London',
            departure: 'New York',
            date: '2023-10-05',
            time: '07:15 AM',
            seat: 'Economy',
            price: 749.99
          },
          {
            id: '4',
            destination: 'Dubai',
            departure: 'Chicago',
            date: '2023-09-22',
            time: '09:30 PM',
            seat: 'First Class',
            price: 2499.99
          }
        ];
        
        setUpcomingFlights(mockUpcoming);
        setPastFlights(mockPast);
        
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch flight bookings",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const FlightCard: React.FC<{ flight: Flight; isPast?: boolean }> = ({ flight, isPast = false }) => {
    return (
      <Card className="mb-4 border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg flex items-center">
                <MapPin size={18} className="mr-2 text-blue-500" />
                {flight.departure} to {flight.destination}
              </h3>
              
              <div className="mt-2 space-y-1 text-gray-600">
                <p className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  {flight.date} • {flight.time}
                </p>
                <p className="flex items-center">
                  <Plane size={16} className="mr-2 text-gray-500" />
                  {flight.seat} Class
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <Badge variant={isPast ? "outline" : "default"} className={isPast ? "text-gray-500" : "bg-green-500"}>
                {isPast ? "Completed" : "Upcoming"}
              </Badge>
              <p className="mt-2 font-bold">${flight.price.toFixed(2)}</p>
              
              {!isPast && (
                <Button variant="outline" size="sm" className="mt-2">
                  Manage Booking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-sky-gradient text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Plane size={24} />
          <span>My Flights</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingFlights.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastFlights.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingFlights.length > 0 ? (
              upcomingFlights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No upcoming flights found.</p>
                <Button className="mt-4 bg-sky-gradient hover:opacity-90">
                  Book a Flight
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastFlights.length > 0 ? (
              pastFlights.map(flight => (
                <FlightCard key={flight.id} flight={flight} isPast />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No past flights found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MyFlights;
