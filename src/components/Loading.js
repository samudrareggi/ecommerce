import React from "react";
import loading from "../assets/loading.gif";
import '../assets/css/Loading.css'

export default function Loading(props) {
  return (
    <div className="container">
      <img src={loading} className="loading" alt="loading" />
    </div>
  );
}
