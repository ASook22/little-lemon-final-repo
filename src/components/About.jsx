// src/components/about.jsx
import heroImage from "../assets/Mario and Adrian A.jpg";
import logo from "../assets/Logo.svg";

export default function About() {
  return (
    <div>
        <div>
             <h2>About Us!</h2>  
        </div>
        <section className="about" id="about">    
            <div className="about-content">
                <img src={logo} alt="Little Lemon Logo" />
                <p>
                  At <strong>Little Lemon</strong> , we’re a family-owned Mediterranean restaurant in Chicago, where tradition meets a fresh, modern twist.
                </p>
                <p>
                  Led by brothers <strong>Chef Mario </strong> and <strong>Chef Adrian</strong>, our kitchen is rooted in the authentic flavors of the Mediterranean coast—handcrafted recipes passed down through generations, perfected with seasonal ingredients and creative flair.
                </p>
                 <p>            
                   Mario brings bold, soulful techniques and a passion for grilling and slow-cooked dishes, while Adrian infuses vibrant, inventive touches to salads, seafood, and small plates. 
                   Together, they create a welcoming space where every bite tells a story of heritage, love, and a shared dream to bring honest, delicious food to our community.
                </p>
            </div>

            <div className="about-image">
                <img 
                src={heroImage}
                alt="Chefs cooking in Little Lemon kitchen" 
                className="about-img"
                />
            </div>
            </section>
    </div>
  );
}
