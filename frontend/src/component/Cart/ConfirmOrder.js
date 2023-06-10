import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'; 

const ConfirmOrder = () => {
  const { deliveryInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const deliveryCharges = subtotal > 2000 ? 0 : 200;

  const tax = subtotal * 0.03;

  const totalPrice = subtotal + tax + deliveryCharges;

  const address = `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state}, ${deliveryInfo.pinCode}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      deliveryCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmdeliveryArea">
            <Typography>Delivery Info</Typography>
            <div className="confirmdeliveryAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{deliveryInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                    <p>Subtotal:</p>
                    </Link>{" "}
                    <p>Size: </p>
                    <span>{item.size}</span>
                    <span>
                      {item.quantity} X Rs. {item.price} ={" "}
                      <b>Rs. {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs. {subtotal}</span>
              </div>
              <div>
                <p>Delivery Charges:</p>
                <span>Rs. {deliveryCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs. {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs. {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;