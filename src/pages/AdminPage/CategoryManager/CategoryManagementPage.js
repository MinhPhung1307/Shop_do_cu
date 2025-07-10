// src/components/AdminComponent/CategoryManager/CategoryManager.jsx
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../AdminPage.module.scss';
import * as ProductService from '../../../services/ProductService'
import { useSelector } from 'react-redux';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

const CategoryManagementPage = ({ setToast }) => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // chọn categoty đầu tiên
  useEffect(() => {
    if (categories.length > 0) {
      const firstCategory = categories[0].name;
      setActiveCategory(firstCategory);
      handleFilter(firstCategory);
    }
  }, [categories]);
  // Gọi API khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAllProduct(user.access_token);
        setProducts(res.data);

        // Tạo danh sách category từ sản phẩm
        const categoryMap = {};
        res.data.forEach(p => {
          if (p.category) {
            if (!categoryMap[p.category]) {
              categoryMap[p.category] = { name: p.category, count: 1 };
            } else {
              categoryMap[p.category].count++;
            }
          }
        });

        // Đổi object thành array
        const categoryArray = Object.values(categoryMap);
        setCategories(categoryArray);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo danh mục
  const handleFilter = (categoryName) => {
    const result = products.filter(p => p.category === categoryName);
    setFiltered(result);
    setActiveCategory(categoryName);
  };

  const handleDelete = async (id) => {
    try {
      const res = await ProductService.deleteProduct(id, user.access_token);
      if(res.status === "OK"){
          setToast("success", "Thành công", res.message);
      }
      // 1. Cập nhật danh sách sản phẩm
      const updatedProducts = products.filter(product => product._id !== id);
      setProducts(updatedProducts);

      // 2. Cập nhật lại danh sách filtered (nếu có lọc)
      const updatedFiltered = filtered.filter(product => product._id !== id);
      setFiltered(updatedFiltered);

      // 3. Tạo lại danh sách category từ updatedProducts
      const categoryMap = {};
      updatedProducts.forEach(p => {
        if (p.category) {
          if (!categoryMap[p.category]) {
            categoryMap[p.category] = { name: p.category, count: 1 };
          } else {
            categoryMap[p.category].count++;
          }
        }
      });
      const categoryArray = Object.values(categoryMap);
      setCategories(categoryArray);
    } catch (error) {
      console.error("Lỗi duyệt sản phẩm:", error);
      alert("Có lỗi xảy ra khi duyệt sản phẩm");
    }
  }

  return (
    <section id="categories" className={cx('content-section')}>
      <div className={cx('category-grid')}>
        {categories.map((cat, index) => (
          <div
            key={index}
            className={cx('category-box', {
              active: activeCategory === cat.name,
            })}
            onClick={() => handleFilter(cat.name)}
          >
            <img src={images[cat.name]} alt={cat.name} />
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
              <img src={p.images[0]} alt={p.name} />
              <span className={cx('code')}>{p.code}</span>
              <span className={cx('name')}>{p.name}</span>
              <span className={cx('price')}>{p.price}</span>
              <button className={cx('delete-btn')} onClick={() => handleDelete(p._id)}>🗑️ Xóa</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CategoryManagementPage;
