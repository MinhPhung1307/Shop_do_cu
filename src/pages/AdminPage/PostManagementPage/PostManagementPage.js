// src/components/AdminComponent/PostedProductManager/PostedProductManager.jsx
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../AdminPage.module.scss';
import { useSelector } from 'react-redux';
import * as ProductService from '../../../services/ProductService'

const cx = classNames.bind(styles);

const PostManagementPage = ({ setToast }) => {
  const user = useSelector((state) => state.user);
    const [productChecked, setProductChecked] = useState([])

    // lấy all sản phẩm đã duyệt
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getAllProductCheck(user.access_token, "checked");
                setProductChecked(res.data)
            } catch (err) {
                console.error("Lỗi khi lấy sản phẩm:", err);
            }
        };
        fetchData();
    }, [])

    const handleReject = async (id) => {
      try {
          const res = await ProductService.deleteProduct(id, user.access_token);
          if(res.status === "OK"){
              setToast("success", "Thành công", res.message);
          }
          // Cập nhật lại danh sách
          setProductChecked((prev) => prev.filter(product => product._id !== id));
      } catch (error) {
          console.error("Lỗi duyệt sản phẩm:", error);
          alert("Có lỗi xảy ra khi duyệt sản phẩm");
      }
  }

  return (
    <section id="products" className={cx('content-section')}>
      <div className={cx('header-line')}>
        <h2>Danh sách sản phẩm đang bán</h2>
        <input type="text" placeholder="Nhập tên sản phẩm" />
      </div>

      {productChecked ?.length === 0 ? (
        <p>Không có sản phẩm nào đang được bán.</p>
      ) : (
          productChecked.map((product) => (
            <div key={product._id} className={cx('product-item')}>
              <img src={product.images[0]} alt={product.name} />
              <span className={cx('code')}>{product._id}</span>
              <span className={cx('name')}>{product.name}</span>
              <span className={cx('price')}>{product.price?.toLocaleString('vi-VN')}đ</span>
              <button className={cx('delete-btn', 'only')} onClick={() => handleReject(product._id)}>Xóa</button>
            </div> 
          ))
      )}
    </section>
  );
};

export default PostManagementPage;
