import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./AppToolbar.css";

const AnonymousMenu = () => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="header-inner container">
      <div>
        <Link to={"/register"} className="header-register">
          Register
        </Link>
      </div>
      <div className="logo" onClick={onLogoClick}>
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div>
        <Link to={"/login"} className="header-login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default AnonymousMenu;
