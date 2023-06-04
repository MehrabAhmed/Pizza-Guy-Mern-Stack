import React, { Fragment, useState } from "react";
import "./Delivery.css";
import { useSelector, useDispatch } from "react-redux";
import { saveDeliveryInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { useNavigate } from 'react-router-dom';

const Delivery = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { deliveryInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(deliveryInfo.address);
  const [city, setCity] = useState(deliveryInfo.city);
  const [pinCode, setPinCode] = useState(deliveryInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo);

  const deliverySubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      alert.error("Phone Number should be 11 digits Long");
      return;
    }
    dispatch(
      saveDeliveryInfo({ address, city, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Delivery Details" />

      <CheckoutSteps activeStep={0} />

      <div className="deliveryContainer">
        <div className="deliveryBox">
          <h2 className="deliveryHeading">Delivery Details</h2>

          <form
            className="deliveryForm"
            encType="multipart/form-data"
            onSubmit={deliverySubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <input
              type="submit"
              value="Continue"
              className="deliveryBtn"
            
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Delivery;
