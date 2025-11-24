import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo from "../Assets/logo.webp"; // ✅ your logo path
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-section about">
          <div className="footer-logo">
            <img src={logo} alt="ShopEase Logo" />
            <h2>SHOE-MART</h2>
          </div>
          <p>
            Discover the latest trends and shop your favorite products with ease. 
            Fast delivery, secure payments, and 24/7 customer support.
          </p>

          <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>


          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>

          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/return-policy">Return Policy</Link></li>
                <li><Link to="/return-policy">Return Policy</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>Subscribe</h3>
          <p>Get the latest updates & offers directly to your inbox.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SHOE-MART. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
