import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import * as UserService from "../../services/UserService";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import imagesAdmin from '../../assets/images/admin';
import HeaderComponent from '../../components/AdminComponent/HeaderComponent/HeaderComponent';
import SidebarComponent from '../../components/AdminComponent/SidebarComponent/SidebarComponent';

const cx = classNames.bind(styles);
const AdminPage = () => {
  const user = useSelector((state) => state.user);
  const [countProductCheck, setCountProductCheck] = useState()
  const [countUser, setCountUser] = useState()

  // lấy số lượng sản phẩm chưa duyêt
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getAllProductCheck(user.access_token);
        setCountProductCheck(res.data.length)
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    fetchData();
  }, [countProductCheck])

  // lấy tất cả user 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getAllUser(user.access_token);
        setCountUser(res.data.length)
      } catch (err) {
        console.error("Lỗi khi lấy người dùng:", err);
      }
    };
    fetchData();
  }, [countUser])

  return (
    <div className={cx('wrapper')}>
      <HeaderComponent user={user} />

      <div className={cx('container')}>
        <SidebarComponent />

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
              <span className={cx('count')}>{countProductCheck}</span>
            </div>

            <div className={cx('box')}>
              <img src={imagesAdmin.logo_account} alt="Tài khoản" />
              <span>Tài khoản</span>  
              <span className={cx('count')}>{countUser}</span>
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
