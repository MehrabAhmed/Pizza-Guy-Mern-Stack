import React from 'react';
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

// import ProtectedRoute from './component/Route/ProtectedRoute';

axios.defaults.withCredentials=true


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

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

    
    <Route path="/account" Component={Profile} />
    <Route path="/myself/update" Component={UpdateProfile} />
    <Route path="/password/update" Component={UpdatePassword} />
    <Route path="/password/forgot" Component={ForgotPassword} />
    <Route path="/password/reset/:token" Component={ResetPassword} />
    <Route path="/cart" Component={Cart} />
    <Route path="/login/delivery" Component={Delivery} />
    
  
  
    </Routes>
    <Footer />
   
    </Router>
  );
}

export default App;
