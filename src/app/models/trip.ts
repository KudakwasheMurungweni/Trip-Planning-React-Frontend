import { Destination } from './destination';
import { Profile } from './profile';

export interface Trip {
  id: number;
  user: Profile;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  destinations: Destination[];
  image?: string;
  activities?: string;
  status?: 'available' | 'completed' | 'canceled';
}

export interface TripCreate {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  user: number;         // User ID
  destinations: number[]; // Array of Destination IDs
  activities?: string;
  image?: string;
}