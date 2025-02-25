import { Profile } from './profile';
import { Trip } from './trip';

export interface Booking {
  id: number;
  user: Profile;
  trip: Trip;
  booking_type: string;
  details: string;
}