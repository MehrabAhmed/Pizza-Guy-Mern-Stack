import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_DELIVERY_INFO,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id, quantity, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        size,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // SAVE DELIVERY INFO
  export const saveDeliveryInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_DELIVERY_INFO,
      payload: data,
    });
  
    localStorage.setItem("deliveryInfo", JSON.stringify(data));
  };