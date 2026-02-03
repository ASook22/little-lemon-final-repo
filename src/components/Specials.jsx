// src/components/Specials.jsx
import greekSalad from "../assets/greek salad.jpg";
import bruschetta from "../assets/bruchetta.svg";
import lemonDessert from "../assets/lemon dessert.jpg";

export default function Specials() {
  return (
    <section className="specials-section" id="menu">
      <h2>This Week's Specials</h2>
      <div className="specials-grid">
        <article className="menu-card">
          <img 
            src={greekSalad} 
            alt="Fresh Greek Salad with crispy lettuce, peppers, olives, and feta cheese" 
            className="card-image"
          />
          <h3>Greek Salad</h3>
          <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese...</p>
          <span className="price">$12.99</span>
        </article>

        <article className="menu-card">
          <img 
            src={bruschetta} 
            alt="Bruschetta on grilled bread with garlic and tomatoes" 
            className="card-image"
          />
          <h3>Bruschetta</h3>
          <p>Our Bruschetta is made from grilled bread that has been smeared with garlic...</p>
          <span className="price">$5.99</span>
        </article>

        <article className="menu-card">
          <img 
            src={lemonDessert} 
            alt="Homemade lemon dessert with a creamy texture" 
            className="card-image"
          />
          <h3>Lemon Dessert</h3>
          <p>This comes straight from grandma’s recipe book, every last ingredient...</p>
          <span className="price">$5.00</span>
        </article>
      </div>
    </section>
  );
}