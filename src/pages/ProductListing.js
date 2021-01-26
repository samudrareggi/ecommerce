import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/ProductListing.css";
import { Card } from "../components";
import { FetchProducts } from "../store/action";
import { LoadingSkeleton } from "../components";

export default function ProductListing() {
  const shoes = useSelector((state) => state.shoes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchProducts());
  }, [dispatch]);

  if (!shoes.length) return <LoadingSkeleton/>

  return (
    <div className="app">
      {shoes.map((el, idx) => (
        <div className="item" key={idx}>
          <Card item={el} idx={idx} />
        </div>
      ))}
    </div>
  );
}
