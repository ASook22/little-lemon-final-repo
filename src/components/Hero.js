// src/components/Hero.js
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional 
          recipes served with a modern twist.
        </p>
        <a href="#reservations" className="btn">Reserve a Table</a>
      </div>
      <div className="hero-image-placeholder">
        {/* You will replace this with <img src={...} alt="Restaurant hero" /> later */}
      </div>
    </section>
  );
}

export default Hero;