// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
        <address>Chicago, Illinois</address>
      </div>
    </footer>
  );
}