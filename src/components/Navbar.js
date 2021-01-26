import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/css/Navbar.css";
import Loading from "./Loading";

export default function Navbar(props) {
  const [svgs, setSvgs] = useState(null);
  const location = useLocation();

  useEffect(() => {
    importSvg();
  }, []);

  const importSvg = () => {
    const reqSvgs = require.context("../assets/svg/", true, /\.svg$/);
    const newSvg = reqSvgs.keys().reduce((images, path) => {
      images[path] = reqSvgs(path);
      return images;
    }, {});
    setSvgs(newSvg);
    if (!localStorage.getItem("svgs"))
      localStorage.setItem("svgs", JSON.stringify(newSvg));
  };

  if (!svgs) return <Loading />;
  
  return (
    <>
      <nav className="navbar-top">
        <div className="text">
          English
          <span>
            <img
              src={svgs["./arrow.svg"]["default"]}
              className="arrow-logo"
              alt="arrow-logo"
            />
          </span>
        </div>
        <div className="text" style={{ paddingLeft: 60 }}>
          <span style={{ marginRight: 25 }}>
            <img
              src={svgs["./truck.svg"]["default"]}
              className="truck-logo"
              alt="truck-logo"
            />
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
        <img
          src={svgs["./nike.svg"]["default"]}
          className="nike-logo"
          alt="nike-logo"
        />
        <div className="nav">
          <ul>
            <li>New Releases</li>
            <li>Men</li>
            <li>Women</li>
            <li>Customize</li>
          </ul>
        </div>
        <ul>
          <li style={{ paddingRight: 20 }}>
            <img
              src={svgs["./bag.svg"]["default"]}
              className="bag-logo"
              alt="bag-logo"
            />
          </li>
          <li>
            <img
              src={svgs["./profile.svg"]["default"]}
              className="profile-logo"
              alt="profile-logo"
            />
          </li>
        </ul>
      </nav>
      {location.pathname === "/" && (
        <div className="title-container">
          <p className="title">New Releases</p>
        </div>
      )}
    </>
  );
}
