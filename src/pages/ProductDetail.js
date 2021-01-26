import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProducts, addBag } from "../store/action";
import "../assets/css/ProductDetail.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Modal from "react-modal";
import { Loading } from "../components";

Modal.setAppElement("#root");
export default function ProductDetail(props) {
  const shoes = useSelector((state) => state.shoes);
  const bags = useSelector((state) => state.bags);
  const [svgs, setSvgs] = useState(null);
  const [isOpen, setIsOpen] = useState({
    state: false,
    id: 0,
    name: "image",
  });
  const [value, setValue] = useState({
    size: 0,
    idx: 0,
    color: 0,
    id: 0,
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const newSvgs = localStorage.getItem("svgs");
    if (!svgs) {
      setSvgs(JSON.parse(newSvgs));
    }
    if (!shoes.length) dispatch(FetchProducts());
  }, [dispatch, shoes, svgs]);

  const onChange = (e, name, idx) => {
    const val = e.target.value;
    const id = name === "size" ? "idx" : "id";
    value[id] !== idx && setValue({ ...value, [id]: idx, [name]: val });
  };

  const onClick = () => {
    let unique = true;
    const temp = [...bags];
    const payload = {
      name: shoes[id].name,
      price: shoes[id].price,
      size: value.size === 0 ? shoes[id].sizes[0] : value.size,
      color: value.color === 0 ? shoes[id].colors[0].color_hash : value.color,
      quantity: 1,
      image: location.state,
    };

    temp.forEach((el, idx) => {
      if (
        el.name === shoes[id].name &&
        el.size === value.size &&
        el.color === value.color
      ) {
        unique = false;
        temp[idx].quantity++;
      }
    });

    if (unique) temp.push(payload);

    dispatch(addBag(temp));

    history.push("/checkout");
    unique = true;
  };
  if (!shoes.length || !svgs) return <Loading/>;

  return (
    <div className="container">
      <Modal
        isOpen={isOpen.state}
        onRequestClose={() => setIsOpen({ ...isOpen, state: false })}
        style={{
          content: {
            display: "flex",
            backgroundColor: "transparent",
            border: 0,
            justifyContent: "center",
            alignItems: "center",
            width: 400,
            height: 400,
            margin: "auto",
          },
        }}
      >
        {isOpen.name === "image" ? (
          <img
            style={{ width: "100%" }}
            src={svgs[`./shoes/edge/${isOpen.id}.svg`]["default"]}
            alt="product"
          />
        ) : (
          <iframe
            src={shoes[id].video}
            frameBorder="0"
            allowFullScreen
            title="video"
            height="400"
            width="400"
          />
        )}
      </Modal>
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
                <div key={idx} className="detail-item">
                  <img
                    src={svgs[`./shoes/edge/${idx}.svg`]["default"]}
                    alt="product"
                    onClick={() =>
                      setIsOpen({
                        ...isOpen,
                        state: true,
                        id: idx,
                        name: "image",
                      })
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="container-content">
          <p className="text category">{shoes[id]["category"]}</p>
          <p className="text name">{shoes[id]["name"]}</p>
          <p className="text description">{shoes[id]["description"]}</p>
          <div className="container-play">
            <div className="btn-play">
              <img
                src={svgs["./play.svg"]["default"]}
                alt="play-button"
                onClick={() =>
                  setIsOpen({
                    ...isOpen,
                    state: true,
                    name: "video",
                  })
                }
              />
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
                  checked={value.idx === idx}
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
                  checked={value.id === id}
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
            <img
              src={svgs["./truck.svg"]["default"]}
              className="truck-logo"
              alt="truck-logo"
            />
          </span>
          FREE SHIPPING OVER $100 PURCHASE
        </div>
        <button className="btn text-btn" onClick={() => onClick()}>
          ADD TO BAG — ${shoes[id]["price"]}
          <span style={{ paddingLeft: 15 }}>
            <img
              src={svgs["./right.svg"]["default"]}
              className="arrow-logo"
              alt="arrow-logo"
            />
          </span>
        </button>
      </div>
    </div>
  );
}
