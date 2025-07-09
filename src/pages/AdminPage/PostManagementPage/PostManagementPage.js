// src/components/AdminComponent/PostedProductManager/PostedProductManager.jsx
import React from 'react';
import classNames from 'classnames/bind';
import styles from './PostManagementPage.module.scss';

const cx = classNames.bind(styles);

const PostManagementPage = () => {
  return (
    <section id="products" className={cx('content-section')}>
      <div className={cx('header-line')}>
        <h2>Danh sách sản phẩm đã đăng</h2>
        <input type="text" placeholder="Nhập tên sản phẩm hoặc MSSP" />
      </div>

      <div className={cx('product-item')}>
        <img src="image/Tai_lieu.png" alt="Sách Kỷ Luật Bản Thân" />
        <span className={cx('code')}>TL01</span>
        <span className={cx('name')}>Sách Kỷ Luật Bản Thân</span>
        <span className={cx('price')}>59.000đ</span>
        <button className={cx('delete-btn')}>Xóa</button>
      </div>
    </section>
  );
};

export default PostManagementPage;
