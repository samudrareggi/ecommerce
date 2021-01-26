import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProducts } from "../store/action";
import truck from "../assets/svg/truck.svg";
import rightArrow from "../assets/svg/right.svg";
import play from "../assets/svg/play.svg";
import "../assets/css/ProductDetail.css";
import { useLocation, useParams } from "react-router-dom";

export default function ProductDetail(props) {
  const [svgs, setSvgs] = useState(null);
  const shoes = useSelector((state) => state.shoes);
  const [payload, setPayload] = useState({
    size: 0,
    idx: 0,
    color: 0,
    id: 0,
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const newSvgs = localStorage.getItem("svgs");
    if (!svgs) {
      setSvgs(JSON.parse(newSvgs));
    }
    if (!shoes.length) dispatch(FetchProducts());
  }, [dispatch, shoes, svgs]);

  const onChange = (e, name, idx) => {
    console.log(e.target.value);
    const value = e.target.value;
    const id = name === "size" ? "idx" : "id";
    payload[id] !== idx && setPayload({ ...payload, [id]: idx, [name]: value });
    console.log(payload);
  };
  if (!shoes.length || !svgs) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <div className="flex-container">
        <div
          style={{
            width: 515,
            height: 785,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          <img
            style={{ width: 500, height: 600, paddingTop: 30 }}
            src={location.state}
            alt="product"
          />
          <div className="detail-product">
            {Array(4)
              .fill()
              .map((_, idx) => (
                <img
                  key={idx}
                  className="detail-item"
                  src={svgs[`./shoes/edge/${idx}.svg`]["default"]}
                  alt="product"
                />
              ))}
          </div>
        </div>
        <div className="container-content">
          <p className="text category">{shoes[id]["category"]}</p>
          <p className="text name">{shoes[id]["name"]}</p>
          <p className="text description">{shoes[id]["description"]}</p>
          <div className="container-play">
            <div className="btn-play">
              <img src={play} alt="play-button" />
            </div>
            <p className="text video">PLAY VIDEO</p>
          </div>
          <div className="size">
            <p style={{ fontWeight: 500, fontSize: 18, marginTop: 38 }}>
              SELECT SIZE (US)
            </p>
            <div className="select-size">
              {shoes[id].sizes.map((el, idx) => (
                <input
                  key={`size-${idx}`}
                  type="radio"
                  name={`size-${idx}`}
                  id={`size-${idx}`}
                  checked={payload.idx === idx}
                  value={el}
                  onChange={(e) => onChange(e, "size", idx)}
                />
              ))}
              {shoes[id].sizes.map((el, idx) => (
                <label key={`size-${idx}`} htmlFor={`size-${idx}`}>
                  {el}
                </label>
              ))}
            </div>
          </div>
          <div className="color">
            <p style={{ fontWeight: 500, fontSize: 18, marginTop: 30 }}>
              SELECT COLOR
            </p>
            <div className="select-color">
              {shoes[id].colors.map((el, id) => (
                <input
                  key={`color-${id}`}
                  type="radio"
                  name={`color-${id}`}
                  id={`color-${id}`}
                  checked={payload.id === id}
                  value={el.color_hash}
                  onChange={(e) => onChange(e, "color", id)}
                />
              ))}
              {shoes[id].colors.map((el, idx) => (
                <label
                  style={{ backgroundColor: el.color_hash }}
                  key={`color-${idx}`}
                  htmlFor={`color-${idx}`}
                ></label>
              ))}
            </div>
          </div>
        </div>
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
    </div>
  );
}
