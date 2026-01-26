// src/components/Specials.js
function Specials() {
  return (
    <section className="specials-section" id="menu">
      <h2>This Week's Specials</h2>
      <div className="specials-grid">
        <article className="menu-card">
          <div className="card-image-placeholder"></div>
          <h3>Greek Salad</h3>
          <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese...</p>
          <span className="price">$12.99</span>
        </article>

        <article className="menu-card">
          <div className="card-image-placeholder"></div>
          <h3>Bruschetta</h3>
          <p>Our Bruschetta is made from grilled bread that has been smeared with garlic...</p>
          <span className="price">$5.99</span>
        </article>

        <article className="menu-card">
          <div className="card-image-placeholder"></div>
          <h3>Lemon Dessert</h3>
          <p>This comes straight from grandma’s recipe book, every last ingredient...</p>
          <span className="price">$5.00</span>
        </article>
      </div>
    </section>
  );
}

export default Specials;