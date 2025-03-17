import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TripSelectionForm from "../trips/TripSelectionForm";
import { bookingService } from "../../services/bookingService";
import { BookingCreate } from "../../models/booking";

interface BookingFormProps {
  tripId?: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ tripId: initialTripId }) => {
  const navigate = useNavigate();
  const [tripId, setTripId] = useState<number | null>(initialTripId || null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update tripId when initialTripId prop changes
  useEffect(() => {
    if (initialTripId) {
      setTripId(initialTripId);
    }
  }, [initialTripId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (tripId === null) {
      setError("Please select a trip");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const bookingData: BookingCreate = {
        trip: tripId,
        // Use current date if needed
        booking_date: new Date().toISOString().split('T')[0]
      };
      
      await bookingService.createBooking(bookingData);
      
      alert("Booking successful!");
      // Redirect to bookings list
      navigate("/bookings");
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>{initialTripId ? "Confirm Your Booking" : "Create New Booking"}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="booking-form">
        {/* Only show trip selection if no tripId was provided */}
        {!initialTripId && (
          <TripSelectionForm onSelectTrip={setTripId} />
        )}
        
        {/* Show selected trip ID if provided through props */}
        {initialTripId && (
          <div className="form-group confirmation-box">
            <p>You are about to book Trip #{initialTripId}</p>
            <p>Click "Confirm Booking" to proceed.</p>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isSubmitting || tripId === null}
          className="submit-button"
        >
          {isSubmitting ? "Processing..." : initialTripId ? "Confirm Booking" : "Submit Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;