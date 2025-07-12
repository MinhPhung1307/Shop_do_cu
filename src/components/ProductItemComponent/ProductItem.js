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

  // Hàm xử lý URL ảnh từ Cloudinary
  const getImageUrl = (url) => {
    console.log("Original image URL:", url);
    if (!url) return;

    // Nếu URL đã là full URL Cloudinary
    if (url.startsWith("http")) return url;

    // Nếu URL là path từ Cloudinary (trường hợp lưu không đầy đủ)
    return `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${url}`;
  };

  return (
    <div className={cx("Product-Item")}>
      {/* 1. Ảnh với xử lý URL linh hoạt */}
      <div className={cx("Product-Image-Container")}>
        <img
          src={getImageUrl(IMG)}
          alt={NAME}
          onError={(e) => {
            e.target.src = "/default-image.jpg";
            e.target.onerror = null; // Ngăn chặn lỗi lặp vô hạn
          }}
          className={cx("Product-Image")}
          loading="lazy" // Tối ưu tải ảnh
        />
      </div>

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
        <button
          className={cx("Product-Button", btnClass)}
          onClick={onCancel}
          aria-label={label}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default ProductItem;
