// src/components/AdminComponent/PostedProductManager/PostedProductManager.jsx
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../AdminPage.module.scss';
import { useSelector } from 'react-redux';
import * as NotificationService from '../../../services/NotificationService';

const cx = classNames.bind(styles);

const NotifyPage = ({ setToast }) => {
  const user = useSelector((state) => state.user);
    const [notifys, setNotifys] = useState([])

    // Gọi API lấy tất cả thông báo
    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const res = await NotificationService.getNotifications(user.id, user.access_token);
              setNotifys(res.data)
          } catch (err) {
              console.error("Lỗi khi lấy thông báo:", err);
          }
      };
      fetchProducts();
    }, [user.access_token]);

    const handleDelete = async (id) => {
      try {
          const res = await NotificationService.deleteNotify(id, user.access_token);
          if(res.status === "OK"){
              setToast("success", "Thành công", res.message);
          }
          // Cập nhật lại danh sách
          setNotifys((prev) => prev.filter(notify => notify._id !== id));
      } catch (error) {
          console.error("Lỗi duyệt sản phẩm:", error);
          alert("Có lỗi xảy ra khi duyệt sản phẩm");
      }
  }
  return (
    <section id="notify" className={cx('content-section')}>
      <div className={cx('header-line')}>
        <h2>Thông báo</h2>
        <input type="text" placeholder="Nhập id người dùng" />
      </div>

      {notifys ?.length === 0 ? (
        <p>Không có thông báo.</p>
      ) : (
          notifys.map((notify) => (
            <div key={notify._id} className={cx('product-item')}>
              <span className={cx('code')}>{notify.title}</span>
              <span className={cx('name')}>{notify.message}</span>
              <span className={cx('price')}>{notify.productId}</span>
              <button className={cx('delete-btn', 'only')} onClick={() => handleDelete(notify._id)}>Xóa</button>
            </div> 
          ))
      )}
    </section>
  );
};

export default NotifyPage;
