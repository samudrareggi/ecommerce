import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";
import nike from "../assets/svg/nike.svg";
import truck from "../assets/svg/truck.svg";
import arrow from "../assets/svg/arrow.svg";
import profile from "../assets/svg/profile.svg";
import bag from "../assets/svg/bag.svg";

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar-top">
        {/* <select name="language" id="language">
          <option value="English">English</option>
          <option value="Indonesia">Indonesia</option>
        </select> */}
        <div className="text">
          English
          <span>
            <img src={arrow} className="arrow-logo" alt="arrow-logo" />
          </span>
        </div>
        <div className="text" style={{ paddingLeft: 60 }}>
          <span style={{ marginRight: 25 }}>
            <img src={truck} className="truck-logo" alt="truck-logo" />
          </span>
          FREE SHIPPING OVER $100 PURCHASE
        </div>
        <ul>
          <li>Shipping</li>
          <li>Faq</li>
          <li>Contact</li>
        </ul>
      </nav>
      <nav className="navbar-content">
        <div>
          <img src={nike} className="nike-logo" alt="nike-logo" />
        </div>
        <ul>
          <li>New Release</li>
          <li>Men</li>
          <li>Women</li>
          <li>Customize</li>
        </ul>
        <ul>
          <li>
            <img src={bag} className="bag-logo" alt="bag-logo" />
          </li>
          <li>
            <img src={profile} className="profile-logo" alt="profile-logo" />
          </li>
        </ul>
      </nav>
    </>
  );
}
