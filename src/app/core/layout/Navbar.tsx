import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">ZimTripPlanner</Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/destinations" className="hover:text-gray-300">Destinations</Link>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/create-trip" className="hover:text-gray-300">Create Trip</Link>
          <Link to="/my-bookings" className="hover:text-gray-300">Bookings</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        </div>
      </div>
    </nav>
  );
};
