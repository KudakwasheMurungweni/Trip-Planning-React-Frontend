import { Profile } from './profile';  // Ensure the correct path if needed
import { Trip } from './trip';         // Correct import path for Trip model

export interface Booking {
  id: number;
  user: Profile;
  trip: Trip | number | null;  // Allow null as well
  booking_type: string;
  details: string;
}


export interface BookingCreate {
  userId: number;
  tripId: number;
  booking_type: string;
  details: string;
}


