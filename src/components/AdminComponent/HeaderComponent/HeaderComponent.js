// src/components/AdminBanner/AdminBanner.js
import React from 'react';
import Menu from '../../Popper/Menu/Menu';
import classNames from 'classnames/bind';
import styles from './HeaderComponent.module.scss';
import imagesAdmin from '../../../assets/images/admin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetUser } from "../../../redux/slides/userSlide";
import * as UserService from "../../../services/UserService";

const cx = classNames.bind(styles);

const HeaderComponent = ({ user, isMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    navigate('/');
  };
  
  const MENU_ITEMS = [
    {
      icon: <i className="fa-solid fa-right-from-bracket"></i>,
      title: 'Đăng xuất',
      callback: handleLogout
    },
  ];

  return (
    <div className={cx('uth_banner')}>
      {isMobile ? (
          <div className={cx('icon-controll')}><i class="fa-solid fa-bars"></i></div>
        ) : (
          <div className={cx('uth_logo')}>
            <a onClick={() => navigate('/admin')}><img src={imagesAdmin.logoShop} alt="UTH Logo" /></a>
          </div>
        ) 
      }
      <Menu items={MENU_ITEMS} offset={[60, -8]}>
        <div className={cx('topbar')}>
          <img src={imagesAdmin.avatar} alt="Avatar" className={cx('avatar')} />
          <span>{user.name}</span>
        </div>
      </Menu>
    </div>
  );
};

export default HeaderComponent;
