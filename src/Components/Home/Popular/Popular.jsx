import React, { useState } from "react";
import "./Popular.css";
import { FaTimes } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
const Popular = ({ onBrandSelect = () => {} }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(10000);
  const brands = ["All", "Nike", "Adidas", "Puma", "Reebok", "Vans"];




  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      {!isOpen && (
        <div className="filter" onClick={toggleSidebar}>
          <p>
            <IoFilter />
          </p>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`filter-sidebar ${isOpen ? "open" : ""}`}>
        {/* Close Button */}
        {isOpen && (
          <div className="close-btn" onClick={(e)=>{e.stopPropagation();toggleSidebar();}}>
            <FaTimes />
          </div>
        )}

        <div className="logo-container">
          <div className="logo-icon">💠</div>
          <h1 className="logo-text">E-Comm</h1>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Products..."
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <h3 className="filter-heading">Brands</h3>
          <ul className="brand-list">
              {brands.map((b,index) => (
                <li key={index} className="brand-item" onClick={() => onBrandSelect(b)}>
                  {b}
                </li>
              ))}
          </ul>
        </div>

        <div className="filter-section">
          <h3 className="filter-heading">Prices</h3>
          <p className="price-label">
            Range: <span>$1000</span> - <span>${price}</span>
          </p>
          <input
            type="range"
            min="1000"
            max="10000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="price-slider"
          />
        </div>

        <div className="item-count">
          <span>40 Items</span>
        </div>
      </aside>

     
    </>
  );
};

export default Popular;
