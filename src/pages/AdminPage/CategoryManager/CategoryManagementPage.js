// src/components/AdminComponent/CategoryManager/CategoryManager.jsx
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../AdminPage.module.scss';

const cx = classNames.bind(styles);

const sampleProducts = [
  { code: "TL01", name: "Sách Kỷ Luật Bản Thân", price: "59.000đ", category: "Tài liệu", image: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" },
  { code: "TL02", name: "Giáo trình Toán Cao Cấp", price: "45.000đ", category: "Tài liệu", image: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" },
  { code: "DC01", name: "Thước dây", price: "15.000đ", category: "Dụng cụ", image: "https://cdn-icons-png.flaticon.com/512/2518/2518028.png" },
  { code: "NT01", name: "Ghế lười Tatami", price: "99.000đ", category: "Nội thất", image: "https://cdn-icons-png.flaticon.com/512/7856/7856530.png" },
  { code: "DĐT01", name: "Màn hình Samsung 24\"", price: "1.200.000đ", category: "Đồ điện tử", image: "https://cdn-icons-png.flaticon.com/512/841/841364.png" },
  { code: "ĐP01", name: "Áo đồng phục size XXL", price: "89.000đ", category: "Đồng phục", image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png" }
];

const categories = [
  { name: "Tài liệu", count: 16, image: "image/Tai_lieu.png" },
  { name: "Dụng cụ", count: 10, image: "image/Dung_cu.png" },
  { name: "Đồ điện tử", count: 2, image: "image/Do_dien_tu.png" },
  { name: "Nội thất", count: 2, image: "image/Noi_that.png" },
  { name: "Đồng phục", count: 4, image: "image/Đồng_phục.png" }
];

const CategoryManagementPage = () => {
  const [filtered, setFiltered] = useState([]);

  const handleFilter = (categoryName) => {
    const result = sampleProducts.filter(p => p.category === categoryName);
    setFiltered(result);
  };

  return (
    <section id="categories" className={cx('content-section')}>
      <div className={cx('category-grid')}>
        {categories.map((cat, index) => (
          <div
            key={index}
            className={cx('category-box')}
            onClick={() => handleFilter(cat.name)}
          >
            <img src={cat.image} alt={cat.name} />
            <div>{cat.name}</div>
            <span>{cat.count}</span>
          </div>
        ))}
      </div>

      <div id="category-products" style={{ marginTop: '30px' }}>
        {filtered.length === 0 ? (
          <p>Không có sản phẩm nào thuộc danh mục này.</p>
        ) : (
          filtered.map((p, idx) => (
            <div key={idx} className={cx('product-item')}>
              <img src={p.image} alt={p.name} />
              <span className={cx('code')}>{p.code}</span>
              <span className={cx('name')}>{p.name}</span>
              <span className={cx('price')}>{p.price}</span>
              <button className={cx('delete-btn')}>🗑️ Xóa</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CategoryManagementPage;
