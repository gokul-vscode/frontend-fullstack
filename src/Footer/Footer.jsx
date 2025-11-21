import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo from "../Assets/logo.webp"; // ✅ your logo path

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
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/store">Store</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
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
        <p>© {new Date().getFullYear()} ShopEase. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
