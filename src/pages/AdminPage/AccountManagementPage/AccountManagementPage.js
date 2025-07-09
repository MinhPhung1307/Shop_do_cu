// src/components/AdminComponent/AccountManager/AccountManager.jsx
import React, { useEffect, useState } from 'react';
import styles from '../AdminPage.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import * as UserService from '../../../services/UserService'
import Image from '../../../components/Image/Image'

const cx = classNames.bind(styles);

const AccountManagementPage = ({ setToast }) => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getAllUser(user.access_token);
        setUsers(res.data)
      } catch (err) {
          console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    fetchData();
  }, [])

  const handleStateUser = async (id) => {
    try {
      const res = await UserService.updateState(id, user.access_token);
      if(res.status === "OK"){
          setToast("success", "Thành công", res.message);
      }
      // Cập nhật lại danh sách người dùng với user vừa đổi trạng thái
      setUsers((prev) => prev.map(user => user._id === id ? { ...user, state: !user.state } : user));
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra");
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      const res = await UserService.deleteUser(id, user.access_token);
      if(res.status === "OK"){
          setToast("success", "Thành công", res.message);
      }
      // Cập nhật lại danh sách người dùng với user vừa xóa
      setUsers((prev) => prev.filter(user => user._id !== id));
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra");
    }
  }

  return (
    <section id="account" className={cx('content-section')}>
      <div className={cx('header-line')}>
        <h2>Danh sách tài khoản</h2>
        <input type="text" placeholder="Nhập tên hoặc MSSV" />
      </div>

      {users
        .filter((item) => !item.isAdmin) // lọc bỏ tài khoản admin
        .map((item) => (
          <div key={item._id} className={cx('account-item')}>
            <Image src="image/Dung_cu.png" alt="Tài khoản"/>
            <span className={cx('email')}>{item.email}</span>
            <span className={cx('name')}>{item.name}</span>
            <button className={item.state ? cx('unlock-btn') : cx('delete-btn')} onClick={() => handleStateUser(item._id)}>
              {item.state ? 'Khóa' : 'Mở khóa'}
            </button>
            <button className={cx('delete-btn')} onClick={() => handleDeleteUser(item._id)}>
              Xóa
            </button>
          </div>
      ))}
    </section>
  );
};

export default AccountManagementPage;
