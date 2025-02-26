import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} ZimTripPlanner. All rights reserved.</p>
    </footer>
  );
};