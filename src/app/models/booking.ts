import { Trip } from './trip';

export interface Booking {
  id: number;
  trip: Trip;
  booking_date: string;
  status: string;
}

export interface BookingCreate {
  trip: number; // Trip ID
  booking_date?: string;
}

export interface DashboardBooking {
  id: number;
  trip_title: string;
  booking_date: string;
  status: string;
}