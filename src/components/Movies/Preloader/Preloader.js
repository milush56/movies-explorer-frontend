import React from "react";
import "./Preloader.css";

const Preloader = ({ isVisible }) => {
  return (
    <div className={`preloader ${isVisible && "preloader__visible"}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
