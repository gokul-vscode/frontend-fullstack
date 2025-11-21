import React from "react";
import "./Bento.css";
import { FaShoppingBag, FaGift, FaStar, FaTruck } from "react-icons/fa";
import shoe1 from '../../../Assets/adidas1.jpg'
import shoe2 from '../../../Assets/adidas2.avif'
import shoe3 from '../../../Assets/adidas3.avif'
import shoe4 from '../../../Assets/adidas4.avif'


const Bento = () => {
  return (
    <section className="bento-grid">
      {/* Big Item - New Arrivals */}
      <div className="bento-item big-item">
        <img src={shoe1} alt="New Arrivals" className="bento-bg" />
        <div className="bento-overlay gradient-purple"></div>
        <div className="bento-content">
          <FaShoppingBag className="bento-icon" />
          <h2>New Arrivals</h2>
          <p>Explore the latest fashion & tech trends just dropped!</p>
          <a href="/explore" id="shopnow"><button>Shop Now</button></a>
        </div>
      </div>

      {/* Small Item - Festive Offers */}
      <div className="bento-item small-item">
        <img src={shoe2} alt="Festive Offers" className="bento-bg" />
        <div className="bento-overlay gradient-pink"></div>
        <div className="bento-content">
          <FaGift className="bento-icon" />
          <h3>Festive Offers</h3>
          <p>Grab up to 50% off!</p>
        </div>
      </div>

      {/* Tall Item - Fast Delivery */}
      <div className="bento-item tall-item">
        <img src={shoe3} alt="Fast Delivery" className="bento-bg" />
        <div className="bento-overlay gradient-mix"></div>
        <div className="bento-content">
          <FaTruck className="bento-icon" />
          <h3>Fast Delivery</h3>
          <p>We deliver happiness right to your doorstep.</p>
        </div>
      </div>

      {/* Small Item - Top Rated */}
      <div className="bento-item small-item">
        <img src={shoe4} alt="Top Rated" className="bento-bg" />
        <div className="bento-overlay gradient-purple"></div>
        <div className="bento-content">
          <FaStar className="bento-icon" />
          <h3>Top Rated</h3>
          <p>See what our happy customers love!</p>
        </div>
      </div>
    </section>
  );
};

export default Bento;
