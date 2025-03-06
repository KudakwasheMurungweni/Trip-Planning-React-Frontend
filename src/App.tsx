import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './app/context/AuthContext';
import { ProtectedRoute } from './app/components/ProtectedRoute';
import { Home } from './app/core/layout/Home';
import { Login } from './app/core/auth/Login';
import { Register } from './app/core/auth/Register';
import { DestinationList } from './app/features/destinations/DestinationList';
import { TripList } from './app/features/trips/TripList';
import { BookingManager } from './app/features/bookings/BookingManager';
// Correct way to import default export
import BookingForm from './app/features/bookings/BookingForm';

import { ReviewSubmission } from './app/features/reviews/ReviewSubmission';
import { ReviewList } from './app/features/reviews/ReviewList';
import { Navbar } from './app/core/layout/Navbar';
import { Footer } from './app/core/layout/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow container mx-auto px-4 py-6">
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
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book-trip/:tripId"
                element={
                  <ProtectedRoute>
                    <BookingForm />
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
              <Route
                path="/review-trip/:tripId"
                element={
                  <ProtectedRoute>
                    <ReviewSubmission tripId={0} />
                  </ProtectedRoute>
                }
              />

              {/* 404 fallback */}
              <Route
                path="*"
                element={<div className="text-center text-xl font-semibold mt-10">404 - Page Not Found</div>}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;