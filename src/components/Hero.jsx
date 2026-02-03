// src/components/Hero.jsx
import heroImage from "../assets/restaurant.jpg";

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>  
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional 
          recipes served with a modern twist.
        </p>
        <a href="reservations" className="btn">Reserve a Table</a>
      </div>

      <div className="hero-image">
        <img 
          src={heroImage}
          alt="Chefs cooking in Little Lemon kitchen" 
          className="hero-img"
        />
      </div>
    </section>
  );
}

export default Hero;