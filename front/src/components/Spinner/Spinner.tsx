import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div className="container-spinner">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;