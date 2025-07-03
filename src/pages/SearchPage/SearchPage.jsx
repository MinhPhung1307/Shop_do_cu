import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchPage.module.scss";
import CardComponent from "../../components/CardComponent/CardComponent.js";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const SearchPage = () => {
  const Searchproducts = useSelector((state) => state.product.searchproduct);
  return (
    <div className={cx("main")}>
      <div className={cx("header")}>
        <div className={cx("header-link")}>
          <span className={cx("link-text")}>Danh sách tìm kiếm</span>
        </div>
      </div>
      <div className={cx("product-list")}>
        {Array.isArray(Searchproducts) && Searchproducts.length > 0 ? (
          Searchproducts.reverse().map((item) => (
            <CardComponent
              key={item._id}
              IMG={`http://localhost:3001/${item.images[0]?.replace(/\\/g, "/")}`}
              NAME={item.name}
              PRICE={item.price}
            />
          ))
        ) : (
          <div>Không có sản phẩm nào phù hợp.</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
