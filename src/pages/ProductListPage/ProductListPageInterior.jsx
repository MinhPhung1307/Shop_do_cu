import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductListPage.module.scss";
import CardComponent from "../../components/CardComponent/CardComponent.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ProductListPageInterior = () => {
  const navigate = useNavigate();
  // Hàm nhận giá trị từ CardComponent
  const products = useSelector((state) => state.product.products);
  return (
    <div className={cx("main")}>
      <div className={cx("header")}>
        <div className={cx("header-link")}>
          <span className={cx("link-text")}>Thể loại</span>
          <span className={cx("link-text")}> &gt; </span>
          <span className={cx("link-text")}>Nội thất</span>
        </div>
        <div className={cx("header-title")}>
          <div className={cx("icon")}>
            <img src={"/image/image_29.png"} alt="Nội thất" />
          </div>
          <h1 className={cx("title")}>Nội thất</h1>
        </div>
      </div>
      <div className={cx("product-list")}>
        {Array.isArray(products) && products.length > 0 ? (
          [...products]
            .reverse()
            .filter((item) => item.category === "Nội thất" && item.status === "checked")
            .map((item) => (
              <CardComponent
                key={item._id}
                onClick={() => navigate(`/digital/${item._id}`)}
                product={item}
              />
            ))
        ) : (
          <div>Không có sản phẩm nào phù hợp.</div>
        )}
      </div>
    </div>
  );
};

export default ProductListPageInterior;
