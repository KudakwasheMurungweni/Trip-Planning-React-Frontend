import { Profile } from '../models/profile';
import { Trip } from '../models/trip';

export interface Booking {
  id: number;
  user: Profile;
  trip: Trip;
  booking_type: string;
  details: string;
}

export interface BookingCreate {
  userId: number;
  tripId: number;
  booking_type: string;
  details: string;
}
