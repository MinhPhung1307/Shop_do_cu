import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Search.module.scss"; // tạo file SCSS riêng nếu cần

const cx = classNames.bind(styles);

const Search = ({ initialValue = "", onSearch }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className={cx("search")} onSubmit={handleSubmit}>
      <input
        className={cx("search-input")}
        type="text"
        placeholder="Nhập tên sản phẩm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={cx("search-btn")} type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};
export default Search;
