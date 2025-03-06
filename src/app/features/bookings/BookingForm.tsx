import { useState } from "react";
import TripSelectionForm from "../trips/TripSelectionForm";
import { bookingService } from "../../services/bookingService";

const BookingForm = () => {
  const [tripId, setTripId] = useState<number | null>(null); // tripId is now a number or null
  const [bookingType, setBookingType] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const userId = 1; // Replace with actual userId from your auth context or store

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tripId === null) {
      console.error("No trip selected");
      return; // Prevent submission if no trip is selected
    }

    try {
      await bookingService.createBooking({
        userId: userId,
        tripId: tripId, // Pass tripId as a number
        booking_type: bookingType,
        details: details,
      });
      alert("Booking successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TripSelectionForm onSelectTrip={setTripId} />
      <input
        type="text"
        value={bookingType}
        onChange={(e) => setBookingType(e.target.value)}
        placeholder="Booking Type"
        required
      />
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Details"
        required
      />
      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;
