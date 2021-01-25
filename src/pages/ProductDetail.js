import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProducts } from "../store/action";
import truck from "../assets/svg/truck.svg";
import rightArrow from "../assets/svg/right.svg";
import "../assets/css/ProductDetail.css";
import { useLocation, useParams } from "react-router-dom";

export default function ProductDetail(props) {
  const shoes = useSelector((state) => state.shoes);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!shoes.length) dispatch(FetchProducts());
  }, [dispatch, shoes]);

  if (!shoes.length) return <h1>Loading...</h1>;
  console.log(location);
  return (
    <>
      <div className="container">
        <div
          style={{
            width: 515,
            height: 645,
            display: "flex",
            alignItems: "end",
          }}
        >
          <img
            style={{ width: 500, height: 600 }}
            src={location.state}
            alt="product"
          />
        </div>
        <p className="text category">{shoes[id]["category"]}</p>
        <p className="text name">{shoes[id]["name"]}</p>
        <p className="text description">{shoes[id]["description"]}</p>
      </div>
      <div className="footer">
        <div className="text">
          <span style={{ marginRight: 25 }}>
            <img src={truck} className="truck-logo" alt="truck-logo" />
          </span>
          FREE SHIPPING OVER $100 PURCHASE
        </div>
        <button className="btn">
          ADD TO BAG — ${shoes[id]["price"]}
          <span style={{ paddingLeft: 15 }}>
            <img src={rightArrow} className="arrow-logo" alt="arrow-logo" />
          </span>
        </button>
      </div>
    </>
  );
}
