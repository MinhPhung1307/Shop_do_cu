import React from 'react';
import classNames from 'classnames/bind';
import styles from './PushProductPage.module.scss'

const cx = classNames.bind(styles);
// Dummy data for product listing

const PushProductPage = () => {
    
    const products = [
        {
            id: 1,
            title: "Giáo trình triết học",
            price: "45.000đ",
            status: "Chờ bán",
            imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
        {
            id: 2,
            title: "Giáo trình triết học",
            price: "45.000đ",
            status: "Đã mua",
            imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
        {
            id: 3,
            title: "Giáo trình triết học",
            price: "45.000đ",
            status: "Đã bán",
            imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        },
    ];
  return (
    <div className={cx('ProductList')}>
      {products.map(product => (
        <div key={product.id} className={cx('product-item productItem')} >
          <img src={product.imageUrl} alt={product.title} className={cx('image')} />
          <div className={cx('details')}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <p>Trạng thái: <strong>{product.status}</strong></p>
            {product.status === "Chờ bán" && (
              <button className={cx('button')} onClick={() => alert("Đơn hàng đã hủy!")}>Hủy Đơn</button>
            )}
            {product.status === "Đã mua" && (
              <button className={cx('button')} onClick={() => alert("Nhắn tin!")}>Nhắn Tin</button>
            )}
            {product.status === "Đã bán" && (
              <button className={cx('button')} onClick={() => alert("Mua sản phẩm khác!")}>Mua sản phẩm khác</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PushProductPage;

