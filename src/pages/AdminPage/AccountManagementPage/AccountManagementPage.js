import React from 'react';
import styles from './AccountManagementPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccountManagementPage = () => {
  return (
    <section id="account" className="content-section">
      <div className="header-line">
        <h2>Danh sách tài khoản bị khóa</h2>
        <input type="text" placeholder="Nhập tên hoặc MSSV" />
      </div>
      <div className="account-item">
        <img src="image/Dung_cu.png" alt="Ảnh tài khoản" />
        <span className="mssv">060205002481</span>
        <span className="name">Lê Gia Bảo</span>
        <button className="unlock-btn">Mở khóa</button>
      </div>
    </section>
  );
};

export default AccountManagementPage;
