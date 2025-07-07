import React, { useState } from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import CardComponent from "../../components/CardComponent/CardComponent.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const HomePage = () => {
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  // Hàm nhận giá trị từ CardComponent
  return (
    <div className={cx("wrapper")}>
      <div className={cx("list__products")}>
        <div className={cx("title")}>
          <img src="/image/image_3.png" alt="Tai_lieu" />
          <h2>Tài liệu</h2>
        </div>
        <div className={cx("list__products--item")}>
          {products && products.length > 0
            ? (() => {
                const filtered = [...products]
                  .reverse()
                  .filter(
                    (item) =>
                      item.category === "Tài liệu" &&
                      item.status === "Chờ duyệt"
                  )
                  .slice(0, 10); // lấy 10 sản phẩm

                const row1 = filtered.slice(0, 5);
                const row2 = filtered.slice(5, 10);

                return (
                  <>
                    <div className={cx("product-row")}>
                      {row1.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                    <div className={cx("product-row")}>
                      {row2.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                  </>
                );
              })()
            : null}
        </div>
      </div>
      <div className={cx("list__products")}>
        <div className={cx("title")}>
          <img src="/image/image_8.png" alt="Dung_cu" />
          <h2>Dụng Cụ</h2>
        </div>
        <div className={cx("list__products--item")}>
          {products && products.length > 0
            ? (() => {
                const filtered = [...products]
                  .reverse()
                  .filter(
                    (item) =>
                      item.category === "Dụng cụ" && item.status === "Chờ duyệt"
                  )
                  .slice(0, 10); // lấy 10 sản phẩm

                const row1 = filtered.slice(0, 5);
                const row2 = filtered.slice(5, 10);

                return (
                  <>
                    <div className={cx("product-row")}>
                      {row1.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createdAt}
                        />
                      ))}
                    </div>
                    <div className={cx("product-row")}>
                      {row2.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                  </>
                );
              })()
            : null}
        </div>
      </div>
      <div className={cx("list__products")}>
        <div className={cx("title")}>
          <img src="/image/image_29.png" alt="Noi_that" />
          <h2>Nội Thất</h2>
        </div>
        <div className={cx("list__products--item")}>
          {products && products.length > 0
            ? (() => {
                const filtered = [...products]
                  .reverse()
                  .filter(
                    (item) =>
                      item.category === "Nội thất" &&
                      item.status === "Chờ duyệt"
                  )
                  .slice(0, 10); // lấy 10 sản phẩm

                const row1 = filtered.slice(0, 5);
                const row2 = filtered.slice(5, 10);

                return (
                  <>
                    <div className={cx("product-row")}>
                      {row1.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                    <div className={cx("product-row")}>
                      {row2.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                  </>
                );
              })()
            : null}
        </div>
      </div>
      <div className={cx("list__products")}>
        <div className={cx("title")}>
          <img src="/image/image_42.png" alt="DO_dien_tu" />
          <h2>Đồ Điện Tử</h2>
        </div>
        <div className={cx("list__products--item")}>
          {products && products.length > 0
            ? (() => {
                const filtered = [...products]
                  .reverse()
                  .filter(
                    (item) =>
                      item.category === "Đồ điện tử" &&
                      item.status === "Chờ duyệt"
                  )
                  .slice(0, 10); // lấy 10 sản phẩm

                const row1 = filtered.slice(0, 5);
                const row2 = filtered.slice(5, 10);

                return (
                  <>
                    <div className={cx("product-row")}>
                      {row1.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                    <div className={cx("product-row")}>
                      {row2.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                  </>
                );
              })()
            : null}
        </div>
      </div>
      <div className={cx("list__products")}>
        <div className={cx("title")}>
          <img src="/image/image_56.png" alt="Dong_phuc" />
          <h2>Đồng Phục</h2>
        </div>
        <div className={cx("list__products--item")}>
          {products && products.length > 0
            ? (() => {
                const filtered = [...products]
                  .reverse()
                  .filter(
                    (item) =>
                      item.category === "Đồng phục" &&
                      item.status === "Chờ duyệt"
                  )
                  .slice(0, 10); // lấy 10 sản phẩm

                const row1 = filtered.slice(0, 5);
                const row2 = filtered.slice(5, 10);

                return (
                  <>
                    <div className={cx("product-row")}>
                      {row1.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                    <div className={cx("product-row")}>
                      {row2.map((item) => (
                        <CardComponent
                          key={item._id}
                          IMG={`http://localhost:3001/${item.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          NAME={item.name}
                          PRICE={item.price}
                          onClick={() => navigate(`/digital/${item._id}`)}
                          productCreatedAt={item.createAt}
                        />
                      ))}
                    </div>
                  </>
                );
              })()
            : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
