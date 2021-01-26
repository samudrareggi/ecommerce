import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "../assets/css/Navbar.css";

export default function Navbar(props) {
  const [svgs, setSvgs] = useState(null);
  const bags = useSelector(state => state.bags)
  const location = useLocation();
  const history = useHistory()

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

  return (
    <>
      <nav className="navbar-top">
        <div className="text">
          English
          <span>
            <img
              src={svgs ? svgs["./arrow.svg"]["default"] : null}
              className="arrow-logo"
              alt=" "
            />
          </span>
        </div>
        <div className="text" style={{ paddingLeft: 60 }}>
          <span style={{ marginRight: 25 }}>
            <img
              src={svgs ? svgs["./truck.svg"]["default"] : null}
              className="truck-logo"
              alt=" "
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
          src={svgs ? svgs["./nike.svg"]["default"] : null}
          className="nike-logo"
          alt=" "
          onClick={() => history.push("/") }
        />
        <div className="nav">
          <ul>
            <li style={{position: "relative"}}>
              New Releases
              <div className="line"></div>
            </li>
            <li>Men</li>
            <li>Women</li>
            <li>Customize</li>
          </ul>
        </div>
        <ul>
          <li className="bag-logo" style={{ paddingRight: 20 }}>
            {/* <div className="bag-logo"> */}
              <img
                src={svgs ? svgs["./bag.svg"]["default"] : null}
                alt=" "
                onClick={() => history.push("/checkout")}
              />
              {
                bags.length ? <div className="badge">{bags.length}</div> : null
              }
              
            {/* </div> */}
          </li>
          <li>
            <img
              src={svgs ? svgs["./profile.svg"]["default"] : null}
              className="profile-logo"
              alt=" "
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
