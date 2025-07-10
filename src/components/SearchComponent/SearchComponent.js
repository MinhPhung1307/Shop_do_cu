import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchProducts } from "../../redux/slides/productSlide";
import classNames from "classnames/bind";
import styles from "./Search.module.scss"; // tạo file SCSS riêng nếu cần
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const Search = ({ initialValue = "", products = [] }) => {
  const dispatch = useDispatch();
  const searchProducts = useSelector((state) => state.product.searchproduct);
  // giá trị ô input
  const [query, setQuery] = useState(initialValue);
  // ô gợi ý
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Gợi ý sản phẩm theo tên
    if (value.trim()) {
      // lộc tên sản phẩm
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // chỉ lấy 5 gợi ý
    } else {
      setSuggestions([]);
    }
  };
  // khí ấn vào 1 tên sản phẩm trong ô gợi ý ô input sẽ hiện giá trị đó và ẩn ô gợi ý
  const handleSelect = (name) => {
    setQuery(name);
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );

    dispatch(setSearchProducts(filtered));
    localStorage.setItem("searchproduct", JSON.stringify(filtered)); // Lưu vào localStorage
    setSuggestions([]);
  };
  // ẩn trang gợi ý khi ấn submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    dispatch(setSearchProducts(filtered));
    localStorage.setItem("searchproduct", JSON.stringify(filtered)); // Lưu vào localStorage
    setSuggestions([]);
  };

  // Mặc định khi load trang sẽ lấy dữ liệu từ localStorage nếu có
  React.useEffect(() => {
    const saved = localStorage.getItem("searchproduct");
    if (saved) {
      dispatch(setSearchProducts(JSON.parse(saved)));
    }
  }, [dispatch]);

  console.log(searchProducts);
  return (
    <div className={cx("search-wrapper")}>
      <form className={cx("search")} onSubmit={handleSubmit}>
        <input
          className={cx("search-input")}
          type="text"
          placeholder="Tìm kiếm"
          value={query}
          onChange={handleChange}
          autoComplete="off"
        />
        <button className={cx("search-btn")} type="submit" onClick={() => navigate("/search")}>
          <i className={cx("fa-solid fa-magnifying-glass")}></i> 
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className={cx("suggestions")}>
          {suggestions.map((item) => (
            <li
              key={item._id}
              onClick={() => handleSelect(item.name)}
              className={cx("suggestion-item")}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Search;
