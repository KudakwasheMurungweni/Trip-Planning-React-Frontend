import { useState } from "react";
import TripSelectionForm from "../trips/TripSelectionForm";
import { bookingService } from "../../services/bookingService";
import { BookingCreate } from "../../models/booking";

const BookingForm = () => {
  const [tripId, setTripId] = useState<number | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tripId === null) {
      console.error("No trip selected");
      return;
    }

    try {
      const bookingData: BookingCreate = {
        trip: tripId, // Using trip instead of tripId to match our BookingCreate interface
        booking_date: bookingDate || undefined
      };
      
      await bookingService.createBooking(bookingData);
      alert("Booking successful!");
      // Reset form
      setTripId(null);
      setBookingDate("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <TripSelectionForm onSelectTrip={setTripId} />
      
      <div className="form-group">
        <label htmlFor="bookingDate">Booking Date</label>
        <input
          id="bookingDate"
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          placeholder="Select Date"
          className="date-input"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={tripId === null}
        className="submit-button"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;