import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductListPage.module.scss";
import CardComponent from "../../components/CardComponent/CardComponent.js";

const cx = classNames.bind(styles);

const id_Map = {
  "Tài liệu": { ico: "./image/image_3.png", label: "Tài liệu" },
  "Dụng cụ": { ico: "./image/image_8.png", label: "Dụng cụ" },
  "Nội thất": { ico: "./image/image_29.png", label: "Nội thất" },
  "Đồ điện tử": { ico: "./image/image_42.png", label: "Đồ điện tử" },
  "Đồng phục": { ico: "./image/image_56.png", label: "Đồng phục" },
};

const ProductListPage = () => {
  const [id, setId] = useState("Đồng phục");
  const { ico, label } = id_Map[id] || {};
  return (
    <div className={cx("main")}>
      <div className={cx("header")}>
        <div className={cx("header-link")}>
          <span className={cx("link-text")}>Thể loại</span>
          <span className={cx("link-text")}> &gt; </span>
          <span className={cx("link-text")}>{label}</span>
        </div>
        <div className={cx("header-title")}>
          <div className={cx("icon")}>
            <img src={ico} alt={label} />
          </div>
          <h1 className={cx("title")}>{label}</h1>
        </div>
      </div>
      <div className={cx("product-list")}>
        <CardComponent
          IMG="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          NAME="Giáo trình triết"
          Price="45.000"
        />
      </div>
    </div>
  );
};

export default ProductListPage;
