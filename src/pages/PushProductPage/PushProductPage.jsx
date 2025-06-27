import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PushProduct.module.scss';

const cx = classNames.bind(styles);

const PushProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: 1,
    usageTime: '',
    category: '',
    description: '',
    image: null,
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Hộp đựng bút',
      price: 30000,
      quantity: 1,
      status: 'Chờ duyệt',
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmsnsswko4wv59',
    },
{
      id: 2,
      name: 'Hộp đựng bút',
      price: 30000,
      quantity: 1,
      status: 'Đã bán',
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmsnsswko4wv59',
    },

    {
      id: 2,
      name: 'Hộp đựng bút',
      price: 30000,
      quantity: 1,
      status: 'Đã bán',
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmsnsswko4wv59',
    },
    {
      id: 3,
      name: 'Xác suất thống kê',
      price: 45000,
      quantity: 1,
      status: 'Đang bán',
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmsnsswko4wv59',
    },
  ]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now(),
      status: 'Chờ duyệt',
      image: URL.createObjectURL(formData.image),
    };
    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      price: '',
      quantity: 1,
      usageTime: '',
      category: '',
      description: '',
      image: null,
    });
  };

  return (
    <div className={cx('container')}>
      {/* Cột trái - Form */}
      <form onSubmit={handleSubmit} className={cx('form')}>
        <label className={cx('imageBox')}>
          <input type="file" accept="image/*" name="image" onChange={handleChange} hidden />
          Thêm hình ảnh
        </label>

        <label className={cx('label')}>Tên sản phẩm:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className={cx('textarea')} rows="2" />

        <label className={cx('label')}>Giá bán:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className={cx('input')} />

        <label className={cx('label')}>Thời gian sử dụng:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className={cx('textarea')} rows="2" />

        <label className={cx('label')}>Danh mục hàng:</label>
        <select name="category" value={formData.category} onChange={handleChange} className={cx('input')}>
          <option value="">none</option>
          <option value="electronics">Đồ điện tử</option>
          <option value="furniture">Nội thất</option>
          <option value="fashion">Thời trang</option>
        </select>

        <label className={cx('label')}>Mô tả:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className={cx('textarea')} rows="4" />

        <button type="submit" className={cx('button')}>Xác nhận</button>
      </form>

      {/* Cột phải - Danh sách sản phẩm */}
      <div className={cx('productList')}>
        <h3 className={cx('listTitle')}>Sản phẩm đã đăng</h3>
        {products.map(product => (
          <div key={product.id} className={cx('productCard')}>
            <img src={product.image} alt={product.name} />
            <div className={cx('info')}>
              <strong>{product.name}</strong>
              <div>{product.price.toLocaleString()}đ</div>
              <div>SL: {product.quantity}</div>
              <div>Trạng thái: <span>{product.status}</span></div>
              {product.status === 'Đang bán' && (
                <button className={cx('cancelBtn')}>Hủy</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PushProductPage;
