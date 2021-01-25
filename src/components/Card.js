import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import "../assets/css/Card.css";
import { useHistory } from "react-router-dom";

export default function Card(props) {
  const { item, idx } = props;
  const [svgs, setSvgs] = useState(null);
  const history = useHistory()

  useEffect(() => {
    importSvg();
  }, []);

  const importSvg = () => {
    const reqSvgs = require.context("../assets/svg/shoes", true, /\.svg$/);
    const newSvg = reqSvgs.keys().map((path) => reqSvgs(path));
    setSvgs(newSvg);
  };

  const onClick = (idx) => {
    history.push({
      pathname: `/${idx}`,
      state: svgs[idx]["default"]
    })
  }

  if (!svgs) return <Loading />;
  
  return (
    <div className="card">
      <div className="card-image" onClick={() => onClick(idx)}>
        <img src={svgs[idx]["default"]} className="image_c" alt="product" />
      </div>
      <div className="card-body">
        <div className="content_c">
          <p>{item.name}</p>
          <p className="price_c">${item.price}</p>
        </div>
        <p className="category_c">{item.category}</p>
      </div>
    </div>
  );
}
