import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { logout } from "../../store/usersThunk";
import { User } from "../../type";
import { apiUrl } from "../../constants";
import logo from "../../assets/images/logo.png";
import "./AppToolbar.css";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let img = "";
  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  if (user?.googleID) {
    img = user.avatar;
  } else {
    img = apiUrl + "/" + user?.avatar;
  }

  const onLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="header-inner container">
      <div className="header-username">
        <h2>
          Hello,
          <span>
            <Link to={`/users/${user._id}`} className="user-name">
              {user.displayName}!
            </Link>
          </span>
        </h2>
        <span>
          <img src={img} alt="avatar" className="header-avatar" />
        </span>
      </div>
      <div className="logo" onClick={onLogoClick}>
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div className="header-inner-right">
        <button className="header-add">
          <Link to="/add-photo">Add new photo</Link>
        </button>
        <button className="header-logout" onClick={handleLogout}></button>
      </div>
    </div>
  );
};

export default UserMenu;
