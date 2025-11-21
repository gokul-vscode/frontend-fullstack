import React from "react";
import "./Success.css";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-box">
        <h1>✅ Order Placed Successfully!</h1>
        <p>Thank you for shopping with us.</p>
        <p>Your order is being processed and will be delivered soon.</p>

        <Link to="/">
          <button className="success-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
