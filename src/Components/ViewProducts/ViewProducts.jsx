


import React, { useState, useEffect } from "react";
import "./ViewProducts.css";
import { FaHeart, FaStar, FaTruckFast } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { IoRefreshCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../CartSlice/CartSlice";

const ViewProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [showFullImage, setShowFullImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const toggleFullImage = () => setShowFullImage(!showFullImage);

  return (
    <div className="viewproduct-container">
      <div className="vp-wrapper">

        {/* LEFT SIDE */}
        <div className="vp-left">
          <div className="vp-main-img">
            <img
              src={product.image}
              alt={product.name}
              onClick={toggleFullImage}
              className="vp-clickable-img"
            />
          </div>

          {showFullImage && (
            <div className="vp-fullscreen" onClick={toggleFullImage}>
              <img src={product.image} alt={product.name} className="vp-full-img" />
            </div>
          )}

          {/* Thumbnails */}
          <div className="vp-thumbnails">
            <img src={product.image} alt="thumb1" />
            <img src={product.image} alt="thumb2" />
            <img src={product.image} alt="thumb3" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="vp-right">
          <h1 className="vp-name">{product.name}</h1>

          <div className="vp-rating">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            <span>(5)</span>
          </div>

          <p className="vp-price">₹ {product.price}</p>

          <p className="vp-desc">{product.description}</p>

          {/* SIZE */}
          <div className="vp-options">
            <div className="vp-size">
              <p>Size:</p>
              <button>S</button>
              <button>M</button>
              <button>L</button>
            </div>

            <div className="vp-color">
              <p>Color:</p>
              <span className="color green"></span>
              <span className="color red"></span>
              <span className="color blue"></span>
            </div>
          </div>

          {/* QUANTITY */}
          <div className="vp-quantity">
            <p>Quantity:</p>
            <div className="qty-controls">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* ADD TO CART */}
          <div className="vp-actions">
            <button
              className="add-cart"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image, // FIXED
                    qty,
                  })
                )
              }
            >
              Add to Cart
            </button>

            <button className="buy-now">Buy Now</button>
            <FaHeart className="fav-icon" />
          </div>

          <div className="vp-extra">
            <p><MdSecurity /> Secure payment & warranty included</p>
            <p><FaTruckFast /> Fast delivery within 3-5 days</p>
            <p><IoRefreshCircle /> Easy return within 7 days</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
