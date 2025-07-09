// src/components/AdminComponent/AccountManager/AccountManager.jsx
import React from 'react';
import styles from './AccountManagementPage.module.scss'; // nếu dùng SCSS module
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccountManagementPage = () => {
  
  return (
    <section id="account" className={cx('content-section')}>
      <div className={cx('header-line')}>
        <h2>Danh sách tài khoản bị khóa</h2>
        <input type="text" placeholder="Nhập tên hoặc MSSV" />
      </div>

      <div className={cx('account-item')}>
        <img src="image/Dung_cu.png" alt="Tài khoản" />
        <span className={cx('mssv')}>060205002481</span>
        <span className={cx('name')}>Lê Gia Bảo</span>
        <button className={cx('unlock-btn')}>Mở khóa</button>
      </div>
    </section>
  );
};

export default AccountManagementPage;
