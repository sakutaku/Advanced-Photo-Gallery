import React from "react";
import "./BtnSpinner.css";

const BtnSpinner = () => {
  return (
    <div className="lds-ring-btn">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BtnSpinner;
