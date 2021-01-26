import React from "react";
import loading from "../assets/loading.gif";
import '../assets/css/Loading.css'

export default function Loading(props) {
  return (
    <div style={{margin: "auto"}}>
      <img src={loading} className="loading" alt="loading" />
    </div>
  );
}
