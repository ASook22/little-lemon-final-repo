// src/components/Testimonials.js
export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <h2>Recent Reviews</h2>
      <div className="testimonials-grid">
        <article className="testimonial-card">
          <div className="avatar-placeholder"></div>
          <h3>Maria Sanchez</h3>
          <p>"Little Lemon has the best Mediterranean food in town! The service is always friendly and quick."</p>
        </article>

        <article className="testimonial-card">
          <div className="avatar-placeholder"></div>
          <h3>John Doe</h3>
          <p>"Amazing flavors and great portions. The lemon dessert is to die for!"</p>
        </article>

        <article className="testimonial-card">
          <div className="avatar-placeholder"></div>
          <h3>Sarah Lee</h3>
          <p>"Family-friendly atmosphere with delicious authentic dishes. Highly recommend!"</p>
        </article>
      </div>
    </section>
  );
}
