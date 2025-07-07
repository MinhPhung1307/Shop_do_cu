import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import Menu from '../../components/Popper/Menu/Menu';
import * as UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { useNavigate } from 'react-router-dom';
import imagesAdmin from '../../assets/images/admin';

const cx = classNames.bind(styles);
const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    navigate('/');
  };

  const MENU_ITEMS = [
    {
      icon: <i class="fa-solid fa-right-from-bracket"></i>,
      title: 'Đăng xuất',
      callback: handleLogout
    },
  ]
  return (
    <div className={cx('wrapper')}>
      <div className={cx('uth_banner')}>
        <div className={cx('uth_logo')}>
          <a href="/admin"><img src={imagesAdmin.logobanner} alt="UTH Logo" /></a>
        </div>
        <Menu items={MENU_ITEMS} offset={[60, -8]}>
          <div className={cx('topbar')}>
            <img src={imagesAdmin.avatar} alt="Avatar" className={cx('avatar')} />
            <span>{user.name}</span>
          </div>
        </Menu>
      </div>

      <div className={cx('container')}>
        <div className={cx('sidebar')}>
          <div className={cx('menu')}>
            <a href="quanlytaikhoan/qltk.html">Quản lý tài khoản</a>
            <a href="quanlydangtin/qldt.html">Quản lý đăng tin</a>
            <a href="#">Phân loại</a>
          </div>
        </div>

        <div className={cx('main-content')}>
          <div className={cx('dashboard')}>
            <div className={cx('box')}>
              <img src={imagesAdmin.logo_list} alt="Số danh mục" />
              <span>Số danh mục</span>
              <span className={cx('count')}>5</span>
            </div>

            <div className={cx('box')}>
              <img src={imagesAdmin.logo_don} alt="Đơn chờ duyệt" />
              <span>Đơn chờ duyệt</span>
              <span className={cx('count')}>2</span>
            </div>

            <div className={cx('box')}>
              <img src={imagesAdmin.logo_account} alt="Tài khoản" />
              <span>Tài khoản</span>  
              <span className={cx('count')}>10</span>
            </div>

            <div className={cx('box')}>
              <img src={imagesAdmin.logo_infor} alt="Thông báo" />
              <span>Thông báo</span>
              <span className={cx('count')}>2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
