import React from 'react'
import '../ViewCart/ViewCart.css'
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "../CartSlice/CartSlice";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ViewCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="cart-container">
        {cart.length === 0 ? (
          <h2>Your Cart is Empty</h2>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">

              <img src={item.image || item.img || item.imgSrc} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="qty-box">
                <button onClick={() => dispatch(decrementQty(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
              </div>

              <AiTwotoneDelete
                className="delete-icon"
                onClick={() => dispatch(removeFromCart(item.id))}
              />

            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-page-total">
          <h3>Total Amount: ₹ {totalAmount}</h3>
          {/* <h4 style={{ flex: 1 }}>₹ {totalAmount}</h4> */}
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </>
  )
}

export default ViewCart;
