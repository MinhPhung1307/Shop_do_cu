import React from "react";
import styles from "./FooterComponent.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const FooterComponent = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer__info")}>
        <h3 className={cx("footer__info--title")}>
          Đồ cũ chất lượng – Giá tiết kiệm
        </h3>
        <p className={cx("footer__info--desc")}>
          Chuyên mua bán đồ cũ trong khuôn viên UTH: sách vở, tài liệu, dụng cụ
          học tập, thiết bị điện tử… đã qua sử dụng nhưng còn rất tốt, giao dịch
          nhanh chóng, tiện lợi.
        </p>
      </div>
      <div className={cx("footer__content")}>
        {/* Thông tin liên lạc */}
        <div className={cx("footer__section")}>
          <h4>Thông tin liên hệ</h4>
          <ul>
            <li>
              <a href="#" target="_bland">
                <i class="fab fa-facebook-square"></i> Phụng Nguyễn
              </a>
            </li>
            <li>
              <a href="maito:Phongdq0952@ut.edu.vn" target="_bland">
                <i class="far fa-envelope"></i> Phongdq0952@ut.edu.vn
              </a>
            </li>
            <li>
              <a href="tel:0978381310" target="_bland">
                <i class="fas fa-phone-alt"></i> 0978 381 310
              </a>
            </li>
          </ul>
        </div>

        {/* Liên kết nhanh  */}
        <div className={cx("footer__section")}>
          <h4>Liên kết nhanh</h4>
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <a href="/orders">Danh sách đặt hàng</a>
            </li>
            <li>
              <a href="/products/new">Đăng sản phẩm</a>
            </li>
            <li>
              <a href="/categories">Phân loại</a>
            </li>
            <li>
              <a href="/cart">Giỏ hàng</a>
            </li>
          </ul>
        </div>

        {/* Danh mục sản phẩm  */}
        <div className={cx("footer__section")}>
          <h4>Danh mục sản phẩm</h4>
          <ul>
            <li>
              <a href="/category/tailieu">Tài liệu</a>
            </li>
            <li>
              <a href="/category/dungcu">Dụng cụ</a>
            </li>
            <li>
              <a href="/category/noithat">Nội thất</a>
            </li>
            <li>
              <a href="/category/dientu">Đồ điện tử</a>
            </li>
            <li>
              <a href="/category/dongphuc">Đồng phục</a>
            </li>
          </ul>
        </div>
        {/* Danh sách thành viên */}
        <div className={cx("footer__section")}>
          <h4>Xây dựng và phát triển - ALTF4</h4>
          <ul>
            <li>Nguyễn Minh Phụng</li>
            <li>Đặng Quốc Phong</li>
            <li>Nguyễn Đức Huy</li>
            <li>Nguyễn Mạnh Cường</li>
            <li>Lê Gia Bảo</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
