import React from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarComponent.module.scss';

const cx = classNames.bind(styles);

const SidebarComponent = ({ onMenuClick, activeSection, className }) => {

  const menuItems = [
    { id: "home", label: "Trang chủ" },
    { id: "account", label: "Quản lý tài khoản" },
    { id: "pending", label: "Quản lý sản phẩm chờ duyệt" },
    { id: "products", label: "Quản lý sản phẩm" },
    { id: "categories", label: "Phân loại" },
    { id: "notify", label: "Thông báo" },
  ];  

  return (
    <nav className={cx('sidebar', className)}>
      <div className={cx('menu')}>
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onMenuClick(item.id);
            }}
            className={activeSection === item.id ? cx('active') : ""}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SidebarComponent;
