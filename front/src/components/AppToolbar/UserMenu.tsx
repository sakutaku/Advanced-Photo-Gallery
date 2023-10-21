import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../store/usersThunk';
import { User } from '../../type';
import { apiUrl } from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let img = '';
  const handleLogout = () => {
    if(window.confirm('Do you want to logout?')) {
      dispatch(logout());
      navigate('/');
    }
  };

  if (user?.googleID) {
    img = user.avatar;
  } else {
    img = apiUrl + '/' + user?.avatar;
  }

  const onLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="header-inner container">
      <div className="logo" onClick={onLogoClick}>
        Logo
      </div>
      <div className="header-inner-right">
        <div className="header-username">
          <h2>Hello, {user.displayName}!</h2>
          <span><img src={img} alt="avatar" className="header-avatar" /></span>
        </div>
        <button className="header-logout" onClick={handleLogout}></button>
      </div>

    </div>
  );
};

export default UserMenu;