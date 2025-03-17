import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AuthProvider } from './app/context/AuthContext';
import { ProtectedRoute } from './app/components/ProtectedRoute';
import { Home } from './app/core/layout/Home';
import { Login } from './app/core/auth/Login';
import { Register } from './app/core/auth/Register';
import { DestinationList } from './app/features/destinations/DestinationList';
import { TripList } from './app/features/trips/TripList';
import BookingManager from './app/features/bookings/BookingManager';
import BookingForm from './app/features/bookings/BookingForm';
import { ReviewSubmission } from './app/features/reviews/ReviewSubmission';
import { ReviewList } from './app/features/reviews/ReviewList';
import { Navbar } from './app/core/layout/Navbar';
import { Footer } from './app/core/layout/Footer';
import './App.css';
import { DashboardBooking } from './app/models/booking';

// Helper component to extract tripId from URL params
function ReviewSubmissionWrapper() {
  const params = useParams();
  const tripId = params.tripId ? parseInt(params.tripId, 10) : 0;
  
  return <ReviewSubmission tripId={tripId} />;
}

// Helper component to extract tripId from URL params for BookingForm
function BookingFormWrapper() {
  const params = useParams();
  const tripId = params.tripId ? parseInt(params.tripId, 10) : undefined;
  
  return <BookingForm tripId={tripId} />;
}

function App() {
  // Mock empty bookings array with the correct type
  const bookings: DashboardBooking[] = [];

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/destinations" element={<DestinationList />} />

            {/* Protected routes */}
            <Route 
              path="/trips" 
              element={
                <ProtectedRoute>
                  <TripList />
                </ProtectedRoute>
              } 
            />

            {/* Bookings routes */}
            <Route 
              path="/bookings" 
              element={
                <ProtectedRoute>
                  <BookingManager bookings={bookings} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings/new" 
              element={
                <ProtectedRoute>
                  <BookingFormWrapper />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings/:tripId" 
              element={
                <ProtectedRoute>
                  <BookingFormWrapper />
                </ProtectedRoute>
              } 
            />

            {/* Reviews routes */}
            <Route 
              path="/reviews/:tripId" 
              element={
                <ProtectedRoute>
                  <ReviewSubmissionWrapper />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reviews" 
              element={
                <ProtectedRoute>
                  <ReviewList />
                </ProtectedRoute>
              } 
            />

            {/* 404 fallback */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;