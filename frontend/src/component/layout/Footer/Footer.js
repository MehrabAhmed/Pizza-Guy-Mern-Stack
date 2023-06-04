import React from 'react'
import Googleplay from "../../../images/Google play.png"
import AppStore from "../../../images/App store.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
              <h4>DOWNLOAD OUR APP</h4>
              <p>Download App for Android and IOS mobile phone</p>
              <img src={Googleplay} alt="Playstore"/>
              <img src={AppStore} alt="Appstore"/>
        </div>

        <div className="midFooter">
           <h4>The Pizza Guy</h4>
           <p>Love at first slice</p>

           <p>Copyright 2023 © The Pizza Guy. All rights reserved.</p>
         </div>
         
        <div className="rightFooter">
            <h4>Connect with us</h4>
            <a href="https://www.facebook.com/login/">Facecook</a>
            <a href="https://www.facebook.com/login/">Instagram</a>
            <a href="https://www.facebook.com/login/">Whatsapp</a>
        </div>

    </footer>
  );
}

export default Footer