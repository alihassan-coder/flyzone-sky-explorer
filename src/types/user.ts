
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Flight {
  id: string;
  destination: string;
  departure: string;
  date: string;
  time: string;
  seat: string;
  price: number;
}
