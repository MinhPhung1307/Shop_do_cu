import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarComponent.module.scss';

const cx = classNames.bind(styles);

const SidebarComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={cx('sidebar')}>
      <div className={cx('menu')}>
        <Link 
          to="/admin" 
          className={cx({ active: currentPath === '/admin' })}
        >
          Trang chủ
        </Link>
        <Link 
          to="/admin/account" 
          className={cx({ active: currentPath === '/admin/account' })}
        >
          Quản lý tài khoản
        </Link>
        <Link 
          to="/admin/pending" 
          className={cx({ active: currentPath === '/admin/pending' })}
        >
          Quản lý chờ duyệt
        </Link>
        <Link 
          to="/admin/products" 
          className={cx({ active: currentPath === '/admin/products' })}
        >
          Quản lý đăng tin
        </Link>
        <Link 
          to="/admin/categories" 
          className={cx({ active: currentPath === '/admin/categories' })}
        >
          Phân loại
        </Link>
      </div>
    </nav>
  );
};

export default SidebarComponent;
