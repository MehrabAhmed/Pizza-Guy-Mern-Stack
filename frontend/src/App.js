import React from 'react';
import { useState, useEffect } from "react";
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from "./actions/userAction";
import axios from "axios";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Delivery from "./component/Cart/Delivery.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js"
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrderList from "./component/admin/OrderList.js"
import ProcessOrder from "./component/admin/ProcessOrder.js"
import UsersList from "./component/admin/UsersList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import ProductReviews from "./component/admin/ProductReviews.js"

axios.defaults.withCredentials=true


function App() {

  const { isAuthenticated, user} = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:4000/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  }, []);

  return (
  <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}

    <Routes>
    <Route path ="/" Component={Home} />
    <Route path ="/product/:id" Component={ProductDetails} />
    <Route path ="/products" Component={Products} />
    <Route path ="/products/:keyword" Component={Products} />
    <Route path ="/search" Component={Search} />
    <Route path ="/login" Component={LoginSignUp} />

    
    {/* <Route path="/account" Component={Profile} /> */}
    <Route
      path="/account"
      element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }
    />
    {/* <Route path="/myself/update" Component={UpdateProfile} /> */}
    <Route
      path="/myself/update"
      element={
        <ProtectedRoute>
          <UpdateProfile/>
        </ProtectedRoute>
      }
    />
    {/* <Route path="/password/update" Component={UpdatePassword} /> */}
    <Route
      path="/password/update"
      element={
        <ProtectedRoute>
          <UpdatePassword/>
        </ProtectedRoute>
      }
    />
 
    <Route path="/password/reset/:token" Component={ResetPassword} />
    <Route path="/cart" Component={Cart} />
    {/* <Route path="/login/delivery" Component={Delivery} /> */}
    <Route
      path="/login/delivery"
      element={
        <ProtectedRoute>
          <Delivery/>
        </ProtectedRoute>
      }
    />

    {stripeApiKey && (
     <Route
         path="/process/payment"
         element=
         {
         <Elements stripe={loadStripe(stripeApiKey)}>
           <ProtectedRoute>
              <Payment/>
           </ProtectedRoute>
        </Elements>
      }
      />)}

    {/* <Route path="/success" Component={OrderSuccess} />  */}
    <Route
      path="/success"
      element={
        <ProtectedRoute>
          <OrderSuccess/>
        </ProtectedRoute>
      }
    />
    {/* <Route path="/orders" Component={MyOrders} />  */}
    <Route
      path="/orders"
      element={
        <ProtectedRoute>
          <MyOrders/>
        </ProtectedRoute>
      }
    />
    {/* <Route path="/order/confirm" Component={ConfirmOrder} /> */}
    <Route
      path="/order/confirm"
      element={
        <ProtectedRoute>
          <ConfirmOrder/>
        </ProtectedRoute>
      }
    />
    {/* <Route path="/orders/:id" Component={OrderDetails} />  */}
    <Route
      path="orders/:id"
      element={
        <ProtectedRoute>
          <OrderDetails/>
        </ProtectedRoute>
      }
    />
    {/* Admin  Routes */}
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/products"
      element={
        <ProtectedRoute>
          <ProductList/>
        </ProtectedRoute>
      }
    />

   <Route
      path="/admin/product/new"
      element={
        <ProtectedRoute>
          <NewProduct/>
        </ProtectedRoute>
      }
    />
    <Route path="/admin/product/:id" Component={UpdateProduct} />
  {/* <Route
      path="/admin/product/:id"
      element={
        <ProtectedRoute>
          <UpdateProduct/>
        </ProtectedRoute>
      }
    /> */}

     <Route
      path="/admin/orders"
      element={
        <ProtectedRoute>
          <OrderList/>
        </ProtectedRoute>
      }
    />
    <Route path="/admin/order/:id" Component={ProcessOrder} />
    {/* <Route
      path="/admin/order/:id"
      element={
        <ProtectedRoute>
          <ProcessOrder/>
        </ProtectedRoute>
      }
    /> */}

    <Route
      path="/admin/users"
      element={
        <ProtectedRoute>
          <UsersList/>
        </ProtectedRoute>
      }
    />
     <Route path="/admin/user/:id" Component={UpdateUser} />
    {/* <Route
      path="/admin/order/:id"
      element={
        <ProtectedRoute>
          <ProcessOrder/>
        </ProtectedRoute>
      }
    /> */}

    <Route
      path="/admin/reviews"
      element={
        <ProtectedRoute>
          <ProductReviews/>
        </ProtectedRoute>
      }
    />
  
  
    </Routes>
    <Footer />
   
    </Router>
  );
}

export default App;
