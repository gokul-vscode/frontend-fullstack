// src/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import logo from "../Assets/logo.webp";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { CiCloudOn } from "react-icons/ci";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "../CartSlice/CartSlice";
import { setUserName } from "../CartSlice/UserSlice"; // <- adjust path if your slice is elsewhere
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup modal
  const [cartOpen, setCartOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserName, setShowUserName] = useState(false);

  // form / search states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // cart from redux
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // username from redux (source of truth for display)
  const userNameDisplay = useSelector((state) => state.user?.userName || "");

  // fetch products once (used for navbar search suggestions)
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => setAllProducts(res.data || []))
      .catch((err) => console.log("Products fetch error:", err));
  }, []);

  // search filtering for dropdown
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filtered);
    setShowDropdown(true);
  }, [searchTerm, allProducts]);

  // Handlers
  const toggleMenu = () => setMenuOpen((s) => !s);
  const toggleSearch = () => setSearchOpen((s) => !s);
  const toggleCart = () => setCartOpen((s) => !s);

  // -------------------------
  // Signup
  // -------------------------
  const handleSignup = async (e) => {
    e?.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
        name,
        email,
        password,
      });

      // optimistic UI: store name in Redux so navbar updates immediately
      dispatch(setUserName(name));

      alert((res.data && res.data.message) || "Account Created!");
      setShowLogin(false);
      // clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed!");
    }
  };

  // -------------------------
  // Login
  // -------------------------
  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      // backend shape may vary; try common keys
      const serverName =
        (res.data && res.data.user && res.data.user.name) ||
        res.data.name ||
        res.data.username ||
        (res.data && res.data.user && res.data.user.username) ||
        "";

      if (serverName) dispatch(setUserName(serverName));
      else if (name) dispatch(setUserName(name)); // fallback to local name if present

      alert((res.data && res.data.message) || "Login successful");
      setShowLogin(false);
      // clear password (keep email or clear both if you prefer)
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed!");
    }
  };

  // -------------------------
  // Cart qty actions
  // -------------------------
  const handleIncrement = (id) => dispatch(incrementQty(id));
  const handleDecrement = (id) => dispatch(decrementQty(id));
  const handleRemove = (id) => dispatch(removeFromCart(id));

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
          <h2>SHOE-MART</h2>
        </div>

        {/* Desktop search */}
        <div className="nav-search desktop-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          />
          <button type="button">
            <FaSearch />
          </button>

          {/* Search dropdown (desktop) */}
          {showDropdown && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="search-option"
                  onClick={() => {
                    navigate(`/viewproducts/${item.id}`);
                    setShowDropdown(false);
                    setSearchTerm("");
                  }}
                >
                  <img src={item.image} alt={item.name} />
                  <p className="option-name">{item.name}</p>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile search icon */}
        <div className="mobile-search-icon" onClick={toggleSearch}>
          <FaSearch />
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="mobile-search-bar">
            <input
              type="text"
              placeholder="Search products..."
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" onClick={toggleSearch}>
              <FaTimes />
            </button>
          </div>
        )}

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#store">Store</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="nav-icons">
          {/* <div className="icon-bg">
            <FaHeart className="icon" />
          </div> */}

          <div className="icon-bg" onClick={toggleCart}>
            <FaShoppingCart className="icon" />
            <span className="cart-length">{cartItems.length}</span>
          </div>

          <div
            className="icon-bg user-hover"
            onClick={() => setShowLogin((s) => !s)}
            onMouseEnter={() => setShowUserName(true)}
            onMouseLeave={() => setShowUserName(false)}
          >
            <FaUserCircle className="icon" />
            {showUserName && userNameDisplay && (
              <p className="hover-username">{userNameDisplay}</p>
            )}
          </div>
        </div>
      </nav>

      {/* display hello message (example) */}
      <div className="nav-hello">
        {userNameDisplay ? <p>Hello, {userNameDisplay}</p> : <p>Login</p>}
      </div>

      {/* Login / Sign Up Modal */}
      {showLogin && (
        <div className="login-container">
          {isLogin ? (
            <form onSubmit={handleLogin} className="auth-form">
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="auth-form">
              <h2>Sign Up</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-btn">
                Create Account
              </button>
              <p>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </p>
            </form>
          )}
        </div>
      )}

      {/* Cart drawer */}
      <div className="cart-wrapper" style={{ right: cartOpen ? "0" : "-100%" }}>
        <div className="cart-header">
          <h3>My Cart</h3>
          <IoMdCloseCircle className="cart-close" onClick={toggleCart} />
        </div>

        <div className="cart-body">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="price">Price: Rs. {item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => handleDecrement(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>

                  <p className="sub-price">
                    Sub: Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <AiTwotoneDelete
                  className="delete-btn"
                  onClick={() => handleRemove(item.id)}
                />
              </div>
            ))
          ) : (
            <p className="empty">
              Your cart is empty <CiCloudOn />
            </p>
          )}
        </div>

        <div className="cart-footer">
          <h4 style={{ flex: 1 }}>Total: ₹ {totalAmount.toFixed(2)}</h4>
          <button className="view-cart" onClick={() => navigate("/cart")}>
            View Cart
          </button>
          <button className="checkout" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
