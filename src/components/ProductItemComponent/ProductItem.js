import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";

const cx = classNames.bind(styles);

const STATUS_MAP = {
  check: { show: "Chờ duyệt", label: "Hủy Đơn", btnClass: "btnChoban" },
  sold: { show: "Đã bán" },
  checked: { show: "Đang bán", label: "Hủy Đơn", btnClass: "btnChoban" },
};

const ProductItem = ({ IMG, NAME, PRICE, STATUS, onCancel }) => {
  const { show, label, btnClass } = STATUS_MAP[STATUS] || {};

  return (
    <div className={cx("Product-Item")}>
      {/* 1. Ảnh */}
      <img src={IMG} alt={NAME} className={cx("Product-Image")} />

      {/* 2. Thông tin: tên, giá, trạng thái */}
      <div className={cx("Product-Info")}>
        <div className={cx("Info-Name")}>{NAME}</div>
        <div className={cx("Info-Price")}>
          {Number(PRICE).toLocaleString("vi-VN")} VNĐ
        </div>
        <div className={cx("Info-Status")}>
          <span className={cx("Label")}>Trạng thái:</span>
          <span className={cx("Status-Text")}>{show}</span>
        </div>
      </div>

      {/* 3. Button hành động */}
      {label && (
        <button className={cx("Product-Button", btnClass)} onClick={onCancel}>
          {label}
        </button>
      )}
    </div>
  );
};

export default ProductItem;
