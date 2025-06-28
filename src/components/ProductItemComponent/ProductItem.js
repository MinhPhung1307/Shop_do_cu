import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";

const cx = classNames.bind(styles);

const STATUS_MAP = {
  "Đặt hàng": { label: "Hủy Đơn", btnClass: "btnChoban" },
  "Đã mua": { label: "Nhắn Tin", btnClass: "btnDamua" },
  "Chờ duyệt": { label: "Hủy Đơn", btnClass: "btnChoban" },
};

const ProductItem = ({ IMG, NAME, PRICE, STATUS }) => {
  const { label, btnClass } = STATUS_MAP[STATUS] || {};

  return (
    <div className={cx("Product-Item")}>
      {/* 1. Ảnh */}
      <img src={IMG} alt={NAME} className={cx("Product-Image")} />

      {/* 2. Thông tin: tên, giá, trạng thái */}
      <div className={cx("Product-Info")}>
        <div className={cx("Info-Name")}>{NAME}</div>
        <div className={cx("Info-Price")}>{PRICE}₫</div>
        <div className={cx("Info-Status")}>
          <span className={cx("Label")}>Trạng thái:</span>
          <span className={cx("Status-Text")}>{STATUS}</span>
        </div>
      </div>

      {/* 3. Button hành động */}
      {label && (
        <button className={cx("Product-Button", btnClass)}>{label}</button>
      )}
    </div>
  );
};

export default ProductItem;
