import React,{ useState } from "react";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
     const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();
    const handlePayment = () => {
    if (paymentMethod === "cod") {
      navigate("/success");
    } else {
      alert(`Redirecting to ${paymentMethod.toUpperCase()} Payment Gateway...`);
      setTimeout(() => navigate("/success"), 1500);
    }
  };
  return (
    <>
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* Shipping / Details */}
        <div className="checkout-section">
          <h2>Shipping Details</h2>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Phone Number" />
        </div>

        {/* Payment Section */}
        <div className="checkout-section">
          <h2>Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery (COD)
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            UPI / Google Pay / PhonePe / Paytm
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit / Debit Card
          </label>

        </div>

        {/* Order Summary */}
        <div className="checkout-section summary-box">
          <h2>Order Summary</h2>
          <p>Subtotal: ₹1000</p>
          <p>Delivery: ₹40</p>
          <h3>Total: ₹1040</h3>

          <button className="place-order-btn" onClick={handlePayment}>
            Place Order
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default Checkout;
 