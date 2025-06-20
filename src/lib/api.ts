import { User, Flight } from "../types/user";

const API_URL = "http://localhost:8000";

interface AuthResponse {
  status: string;
  message: string;
  access_token?: string;
  token_type?: string;
  code: number;
  uuid?: string;
}

interface AgentResponse {
  response: string;
}

export const api = {
  // Authentication
  register: async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Registration failed");
    }

    return response.json();
  },

  login: async (userData: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Login failed");
    }

    return response.json();
  },

  // Chat Agent
  askAgent: async (query: string, token: string): Promise<AgentResponse> => {
    const response = await fetch(`${API_URL}/agent/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to get agent response");
    }

    return response.json();
  },

  // Flights
  getMyFlights: async (token: string): Promise<Flight[]> => {
    const response = await fetch(`${API_URL}/bookings/my-flights`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch flights");
    }

    return response.json();
  },
  
  // This would be implemented in a real application
  searchFlights: async (from: string, to: string, date: Date | undefined, passengers: number, token: string): Promise<Flight[]> => {
    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    
    const response = await fetch(`${API_URL}/bookings/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ from, to, date: formattedDate, passengers }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to search flights");
    }

    return response.json();
  },

  bookFlight: async (flightId: string, token: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_URL}/bookings/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ flightId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to book flight");
    }

    return response.json();
  },
};