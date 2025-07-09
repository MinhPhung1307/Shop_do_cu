import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import { useSelector } from "react-redux";
import HeaderComponent from '../../components/AdminComponent/HeaderComponent/HeaderComponent';
import SidebarComponent from '../../components/AdminComponent/SidebarComponent/SidebarComponent';
import HomePage from './HomePage/HomePage';
import AccountManagementPage from './AccountManagementPage/AccountManagementPage';
import PendingManagementPage from './PendingManagementPage/PendingManagementPage';
import PostManagementPage from './PostManagementPage/PostManagementPage';
import CategoryManagementPage from './CategoryManager/CategoryManagementPage';
import ToastMessage from '../../components/Message/Message';

const cx = classNames.bind(styles);
const AdminPage = () => {
  const user = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState("home");
  const [toast, setToast] = useState(null);
  const showToast = (type, title, message, duration = 3000) => {
    setToast({ type, title, message, duration });
  };
  
  const showSection = (id) => {
    setActiveSection(id);
  };

  useEffect(() => {
    setActiveSection("home"); // Hiển thị mặc định
  }, []);


  return (
    <div className={cx('wrapper')}>
      {toast && (
        <ToastMessage
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
      <HeaderComponent user={user} />

      <div className={cx('container')}>
        <SidebarComponent onMenuClick={showSection} activeSection={activeSection}/>

        <div className={cx('main-content')}>

          {activeSection === "home" && (
            <HomePage onMenuClick={showSection}/>
          )}

          {activeSection === "account" && (
            <AccountManagementPage/>
          )}

          {activeSection === "pending" && (
            <PendingManagementPage setToast={showToast}/>
          )}

          {activeSection === "products" && (
            <PostManagementPage/>
          )}

          {activeSection === "categories" && (
            <CategoryManagementPage/>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
