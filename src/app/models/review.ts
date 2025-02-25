import type { Profile } from './profile';
import type { Trip } from './trip';

export interface Review {
  id: number;
  user: Profile;
  trip: Trip;
  rating: number;
  comment: string;
}

// Add this create type
export interface ReviewCreate {
  rating: number;
  comment: string;
  user: number;  // User ID
  trip: number;   // Trip ID
}