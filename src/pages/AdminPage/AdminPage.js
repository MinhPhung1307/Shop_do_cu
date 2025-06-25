import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';

const cx = classNames.bind(styles);
const AdminPage = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('uth_banner')}>
        <div className={cx('uth_logo')}>
          <img src="./image/admin/logobanner.png" alt="UTH Logo" />
        </div>
        <div className={cx('topbar')}>
          <img src="./image/admin/avt.jpg" alt="Avatar" className={cx('avatar')} />
          <span>Đặng Quốc Phong</span>
        </div>
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
              <img src="./image/admin/logo_list.png" alt="Số danh mục" />
              <span>Số danh mục</span>
              <span className={cx('count')}>5</span>
            </div>

            <div className={cx('box')}>
              <img src="./image/admin/logo_don.png" alt="Đơn chờ duyệt" />
              <span>Đơn chờ duyệt</span>
              <span className={cx('count')}>2</span>
            </div>

            <div className={cx('box')}>
              <img src="./image/admin/logo_account.png" alt="Tài khoản" />
              <span>Tài khoản</span>
              <span className={cx('count')}>10</span>
            </div>

            <div className={cx('box')}>
              <img src="./image/admin/logo_infor.png" alt="Thông báo" />
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
