import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductDigital.module.scss";
import CardComponent from "../../components/CardComponent/CardComponent";

const cx = classNames.bind(styles);

export default function Digital() {
  const relatedProducts = [
    {
      id: 1,
      name: "Tên SP 1",
      price: "₫100.000",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      id: 2,
      name: "Tên SP 2",
      price: "₫200.000",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ];
  const thumbnails = [
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  ];
  const [mainImage, setMainImage] = React.useState(thumbnails[0]);

  return (
    <div className={cx("page-container")}>
      <main className={cx("main-content")}>
        <div className={cx("layout-container")}>
          {/* Left panel */}
          <div className={cx("left-panel")}>
            <img src={mainImage} alt="Sản phẩm" className={cx("main-image")} />
            <div className={cx("thumbnail-container")}>
              {thumbnails.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Thumb ${i}`}
                  className={cx("thumbnail")}
                  onClick={() => setMainImage(src)}
                />
              ))}
            </div>
            <h1 className={cx("product-title")}>Tên sản phẩm</h1>
            <p className={cx("product-price")}> 777.000<span> đ</span></p>
            <div className={cx("product-status")}>
              <span className={cx("status-label")}>
                Tình trạng: Đã qua sử dụng
              </span>
              <span className={cx("category-label")}>Phân loại: Điện tử</span>
            </div>
            <button className={cx("btn-primary", "buy-button")}>Mua ngay</button>
            <div className={cx("related-section")}>
              <h3 className={cx("section-title")}>Sản phẩm liên quan</h3>
              <div className={cx("related-grid")}>
                <CardComponent
                  IMG="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  NAME="Giáo trình triết"
                  PRICE="45.000"
                />
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div className={cx("right-panel")}>
            <section className={cx("seller-info")}>
              <h2 className={cx("section-title")}>Thông tin người bán</h2>
              <div className={cx("seller-details")}>
                <img
                  src="./image/avatar.jpeg"
                  alt="Avatar"
                  className={cx("seller-avatar")}
                />
                <div className={cx("seller-text")}>
                  <p className={cx("seller-name")}>Tên người bán</p>
                </div>
              </div>
              <div className={cx("seller-actions")}>
                <button className={cx("btn-primary")}>Nhắn tin</button>
                <button className={cx("btn-outline")}>Report</button>
              </div>
            </section>
            <section className={cx("auction-section")}>
              <h3 className={cx("section-title")}>Đấu giá</h3>
              <p className={cx("current-price")}>
                Giá hiện tại <span>1.000.000</span> đ
              </p>
              <div className={cx("bid-input")}>
                <input
                  type="number"
                  placeholder="Đặt giá của bạn"
                  className={cx("bid-field")}
                />
                <button className={cx("btn-outline", "bid-button")}>
                  Đặt giá
                </button>
              </div>
              <table className={cx("bid-table")}>
                <thead>
                  <tr>
                    <th>Người đấu giá</th>
                    <th>Giá đặt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cx("infor__auction")}>
                    <td>Người A</td>
                    <td>
                      1.000.000<span> đ</span>
                    </td>
                  </tr>
                  <tr className={cx("infor__auction")}>
                    <td>Người B</td>
                    <td>
                      900.000<span> đ</span>
                    </td>
                  </tr>
                  <tr className={cx("infor__auction")}>
                    <td>Người C</td>
                    <td>
                      850.000<span> đ</span>
                    </td>
                  </tr>
                  <tr className={cx("infor__auction")}>
                    <td>Người F</td>
                    <td>
                      830.000<span> đ</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
