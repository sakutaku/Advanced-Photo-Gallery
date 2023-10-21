import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AppToolbar.css';

const AnonymousMenu = () => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="header-inner container">
      <div className="logo" onClick={onLogoClick}>
        Logo
      </div>
      <div>
        <Link to={'/register'} className="header-register">Register</Link>
        <Link to={'/login'} className="header-login">Login</Link>
      </div>
    </div>
  );
};

export default AnonymousMenu;