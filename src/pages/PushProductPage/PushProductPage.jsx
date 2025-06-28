import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PushProduct.module.scss";
import ProductItem from "../../components/ProductItemComponent/ProductItem";

const cx = classNames.bind(styles);

export default function PushProductPage() {
  const [tab, setTab] = useState("add");
  const [images, setImages] = useState([]);
  const nameRef = useRef();
  const priceRef = useRef();
  const usedRef = useRef();
  const categoryRef = useRef();
  const descRef = useRef();
  const fileInputRef = useRef();

  return (
    <div className={cx("container")}>
      {/* Thanh điều hướng */}
      <div className={cx("navTabs")}>

        <button
          className={cx("navButton", { activeTab: tab === "add" })}
          onClick={() => setTab("add")}
        >
          Đăng sản phẩm
        </button>
        <button
          className={cx("navButton", { activeTab: tab === "history" })}
          onClick={() => setTab("history")}
        >
          Lịch sử
        </button>
      </div>

      {/* Tab Nội dung */}
      {tab === "add" && (
        <section className={cx("section")}>
          <h2 className={cx("heading")}>Đăng Sản Phẩm</h2>
          <div
            className={cx("uploadArea")}
            onClick={() => fileInputRef.current.click()}
          >
            {images.length === 0 && (
              <span className={cx("placeholder")}>
                <i class="fa-solid fa-camera"></i> Thêm hình ảnh (nhiều)
              </span>
            )}
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className={cx("previewImage")}
              />
            ))}
            <input
              type="file"
              accept="image/*"
              multiple
              className={cx("hiddenFileInput")}
              ref={fileInputRef}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                Promise.all(
                  files.map(
                    (f) =>
                      new Promise((res) => {
                        const reader = new FileReader();
                        reader.onload = () => res(reader.result);
                        reader.readAsDataURL(f);
                      })
                  )
                ).then(setImages);
              }}
            />
          </div>

          <form
            className={cx("form")}
            onSubmit={(e) => {
              e.preventDefault();
              const product = {
                images,
                name: nameRef.current.value,
                price: parseFloat(priceRef.current.value).toLocaleString(
                  "vi-VN"
                ),
                used: usedRef.current.value,
                category: categoryRef.current.value,
                desc: descRef.current.value,
                timestamp: new Date().toLocaleString(),
              };
              e.target.reset();
              setImages([]);
            }}
          >
            {/* Các trường input */}
            <div className={cx("field")}>
              <label>Tên sản phẩm</label>
              <input ref={nameRef} type="text" required />
            </div>
            <div className={cx("field")}>
              <label>Giá bán (VND)</label>
              <input ref={priceRef} type="number" required />
            </div>
            <div className={cx("field")}>
              <label>Thời gian đã dùng</label>
              <input ref={usedRef} type="text" placeholder="Ví dụ: 6 tháng" />
            </div>
            <div className={cx("field")}>
              <label>Danh mục</label>
              <select ref={categoryRef}>
                <option value="">-- Chọn --</option>
                <option value="Tài liệu">Tài liệu</option>
                <option value="Tài liệu">Dụng cụ</option>
                <option value="Tài liệu">Nội thất</option>
                <option value="Điện tử">Đồ điện tử</option>
                <option value="Thời trang">Đồng phục</option>
              </select>
            </div>
            <div className={cx("field")}>
              <label>Mô tả</label>
              <textarea ref={descRef} rows={3} />
            </div>
            <button type="submit" className={cx("submitButton")}>
              Xác nhận
            </button>
          </form>
        </section>
      )}

      {tab === "history" && (
        <section className={cx("section")}>
          <h2 className={cx("heading")}>Lịch Sử Đã Đăng</h2>

           <div>
            <ProductItem
                IMG="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                NAME="Giáo trình triết haoid adhuashd gdjha udthf ngu dr hdsrf uhbbdrug dsfuyhig g"
                PRICE="45.000"
                STATUS="Chờ duyệt"
            />
            <ProductItem
                IMG="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                NAME="Giáo trình triết haoid adhuashd gdjha udthf ngu dr hdsrf uhbbdrug dsfuyhig g"
                PRICE="45.000"
                STATUS="Đã bán"
            />
        </div>
        </section>
      )}
    </div>
  );
}
