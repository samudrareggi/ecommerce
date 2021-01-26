import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/Bag.css";
import { debounce } from "lodash";
import { addBag } from "../store/action";

export default function Bag(props) {
  const bags = useSelector((state) => state.bags);
  const [svgs, setSvgs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSvgs = localStorage.getItem("svgs");
    if (!svgs) {
      setSvgs(JSON.parse(newSvgs));
    }
  });

  const onChange = debounce((e, id) => {
    const currentVal = [...bags];
    currentVal[id].quantity = e.target.value;
    dispatch(addBag(currentVal));
  }, 500);

  const onClick = (id) => {
    dispatch({
      type: "DELETE_BAG",
      payload: id,
    });
  };

  if (!svgs) return <h1>Loading...</h1>;
  return (
    <div className="container">
      <div
        style={{
          fontSize: 50,
          fontFamily: "Poppins",
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h1>
          Your Bag
          <span className="bag-logo">
            <img
              style={{ width: 60, paddingLeft: 26 }}
              src={svgs["./bag.svg"]["default"]}
              alt="bag-logo"
            />
            {bags.length ? (
              <div
                className="badge"
                style={{ top: 35, right: -10, width: 25, height: 25 }}
              >
                {bags.length}
              </div>
            ) : null}
          </span>
        </h1>
      </div>
      <div>
        <table>
          <thead>
            <tr className="top">
              <th className="row-product">PRODUCT</th>
              <th className="row-price">PRICE</th>
              <th className="row-quantity">QUANTITY</th>
              <th className="row-total">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {bags.map((el, id) => (
              <tr key={id}>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <button
                    style={{
                      border: 0,
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => onClick(id)}
                  >
                    <img
                      src={svgs["./cross.svg"]["default"]}
                      alt="cross-logo"
                    />
                  </button>
                  <img
                    src={el.image}
                    style={{ width: 150, paddingLeft: 45 }}
                    alt="product"
                  />
                  <div style={{ paddingLeft: 30 }}>
                    <p className="text-name">{el.name}</p>
                    <div className="text-sc">
                      Size: {el.size}
                      <span style={{ paddingLeft: 20 }}>
                        Color
                        <svg style={{ marginLeft: 10 }} width="20" height="20">
                          <rect
                            width="20"
                            height="20"
                            style={{ fill: el.color }}
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-price">${el.price}</td>
                <td>
                  <input
                    type="number"
                    className="box-quantity"
                    defaultValue={el.quantity}
                    onChange={(e) => onChange(e, id)}
                    min="1"
                  />
                </td>
                <td className="text-price">
                  ${(el.quantity * el.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th
                colSpan="2"
                className="text-sc"
                style={{ backgroundColor: "#FAFAFA", height: 64 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <p>TOTAL</p>
                  <p>$
                    {bags.reduce((val, el) => {
                      let result = val + el.quantity * el.price;
                      return +result.toFixed(2);
                    }, 0)}
                  </p>
                </div>
              </th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th
                colSpan="2"
                className="text-btn tesss"
                style={{ backgroundColor: "#000", height: 52 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: 20,
                    paddingRight: 20,
                    cursor: "pointer",
                  }}
                >
                  <p>PAY NOW</p>
                  <img src={svgs["./right.svg"]["default"]} alt="arrow-logo" />
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
