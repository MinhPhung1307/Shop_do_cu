import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProductDigital.module.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Digital() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id || "";

  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user);
  // Tìm sản phẩm theo id
  const productitem = React.useMemo(() => {
    return products.find((item) => item._id === id);
  }, [products, id]);

  const [seller, setSeller] = useState(null);

  useEffect(() => {
    if (!productitem || !productitem._iduser) {
      console.warn("Không có _iduser nên không gọi API");
      return;
    }

    const fetchSeller = async () => {
      try {
        // gọi API
        const res = await fetch(
          `http://localhost:3001/api/user/public/${productitem._iduser}`
        );
        const result = await res.json();

        console.log("Kết quả:", result);

        if (result.status === "OK") {
          setSeller(result.data);
        } else {
          console.error("Không lấy được người bán:", result.message);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API người bán:", err);
      }
    };

    fetchSeller();
  }, [productitem]); // chỉ cần theo dõi productitem

  console.log("User ID:", productitem?._iduser);
  console.log("seller:", seller?.name);

  const thumbnails =
    productitem?.images?.map(
      (img) => `http://localhost:3001/${img.replace(/\\/g, "/")}`
    ) || [];

  const [mainImage, setMainImage] = React.useState("");

  useEffect(() => {
    const resetImage = () => {
      if (productitem?.images?.length > 0) {
        const url = `http://localhost:3001/${productitem.images[0].replace(
          /\\/g,
          "/"
        )}`;
        setMainImage(url);
      }
    };
    resetImage();
  }, [productitem]);

  // lọc sản phẩm liên quan
  const relatedProducts = products
    .filter(
      (item) =>
        item._id !== productitem?._id &&
        (item.category === productitem?.category ||
          item.name === productitem?.name)
    )
    .sort((a, b) => b._id.localeCompare(a._id)) // sắp giảm dần theo _id => mới nhất
    .slice(0, 4); // lấy 4 sản phẩm liên quan mới nhất

  // hàm tính thời gian
  const [timeLeft, setTimeLeft] = useState("");

  const [countdownColorClass, setCountdownColorClass] = useState(
    cx("countdown-normal-color")
  ); // Mặc định khởi tạo là class cho màu đen
  const productCreatedAt = productitem?.createdAt;
  useEffect(() => {
    // Đảm bảo productCreatedAt được cung cấp và là một ngày hợp lệ
    if (!productCreatedAt) {
      setTimeLeft("00 : 00 : 00");
      setCountdownColorClass(cx("countdown-expired-color")); // Màu xám
      return;
    }

    const creationDate = new Date(productCreatedAt);
    // Tính toán thời gian kết thúc: thời gian tạo + 48 giờ
    const countdownEndTime = new Date(
      creationDate.getTime() + 48 * 60 * 60 * 1000
    );

    const calculateTimeLeft = () => {
      const difference = countdownEndTime.getTime() - new Date().getTime();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)), // Tổng số giờ còn lại
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    // Thiết lập interval để cập nhật đồng hồ đếm ngược mỗi giây
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (Object.keys(newTimeLeft).length === 0) {
        setTimeLeft("00 : 00 : 00"); // Khi hết thời gian, hiển thị cố định 00:00:00
        setCountdownColorClass(cx("countdown-expired-color")); // Màu xám khi hết thời gian
        clearInterval(timer); // Dừng đếm ngược khi hết thời gian
      } else {
        // Định dạng hiển thị thời gian còn lại
        // Đảm bảo luôn chuyển đổi sang chuỗi và dùng padStart
        const hours = String(newTimeLeft.hours || 0).padStart(2, "0");
        const minutes = String(newTimeLeft.minutes || 0).padStart(2, "0");
        const seconds = String(newTimeLeft.seconds || 0).padStart(2, "0");
        // Cập nhật class màu dựa trên số giờ
        if (newTimeLeft.hours <= 1) {
          // Nếu số giờ còn lại nhỏ hơn hoặc bằng 1
          setCountdownColorClass(cx("countdown-urgent-color")); // Đặt class cho màu đỏ
        } else {
          // Nếu số giờ còn lại lớn hơn 1
          setCountdownColorClass(cx("countdown-normal-color")); // Đặt lại class cho màu đen
        }

        setTimeLeft(`${hours} : ${minutes} : ${seconds}`);
      }
    }, 1000);

    // Hàm dọn dẹp: xóa interval khi component bị gỡ khỏi DOM
    return () => clearInterval(timer);
  }, [productCreatedAt]); // Dependency array: re-run useEffect nếu productCreatedAt thay đổi

  return (
    <div className={cx("page-container")}>
      <main className={cx("main-content")}>
        <div className={cx("layout-container")}>
          {/* Left panel */}
          <div className={cx("left-panel")}>
            <img
              src={mainImage}
              alt={productitem?.name}
              className={cx("main-image")}
            />
            <div className={cx("thumbnail-container")}>
              {thumbnails.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Thumb ${i}`}
                  className={cx("thumbnail")}
                  onClick={() => setMainImage(src)}
                  style={{ width: 50, cursor: "pointer" }}
                />
              ))}
            </div>
            <h1 className={cx("product-title")}>{productitem?.name}</h1>
            <p className={cx("product-detail")}>
              Chi tiết sản phẩm:
              <span>{productitem?.description}</span>
            </p>
            <p className={cx("product-price")}>
              {" "}
              {Number(productitem?.price).toLocaleString("vi-VN")}
              <span> VNĐ</span>
            </p>
            <div className={cx("product-status")}>
              <span className={cx("status-label")}>
                Thời gian đã dùng:
                <span className={cx("using-time")}>{productitem?.used}</span>
              </span>
              <span className={cx("category-label")}>
                Phân loại: <span>{productitem?.category}</span>
              </span>
            </div>
            <button className={cx("btn-primary", "buy-button")}>
              Mua ngay
            </button>
            <div className={cx("related-section")}>
              <h3 className={cx("section-title")}>Sản phẩm liên quan</h3>
              <div className={cx("related-grid")}>
                {relatedProducts.map((prod) => (
                  <CardComponent
                    key={prod._id}
                    IMG={
                      prod.images && prod.images[0]
                        ? `http://localhost:3001/${prod.images[0].replace(
                            /\\/g,
                            "/"
                          )}`
                        : "https://via.placeholder.com/150" // fallback nếu không có ảnh
                    }
                    NAME={prod.name}
                    PRICE={prod.price}
                    onClick={() => navigate(`/digital/${prod._id}`)}
                    productCreatedAt={prod.createAt}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div className={cx("right-panel")}>
            <section className={cx("seller-info")}>
              <h2 className={cx("section-title")}>Thông tin người bán</h2>
              <div className={cx("seller-details")}>
                <img
                  src={
                    seller?.avatar ||
                    "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/118441977edc639baf728fd892d500b3~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=7319bc57&x-expires=1750863600&x-signature=8hxF5yn865Du7TTQZzXT0Vvj4AE%3D&t=4d5b0474&ps=13740610&shp=30310797&shcp=c1333099&idc=my"
                  }
                  alt="Avatar"
                  className={cx("seller-avatar")}
                />
                <div className={cx("seller-text")}>
                  <p className={cx("seller-name")}>{seller?.name}</p>
                </div>
              </div>
              <div className={cx("seller-actions")}>
                <button className={cx("btn-primary")}>Nhắn tin</button>
                <button className={cx("btn-outline")}>Report</button>
              </div>
            </section>
            <section className={cx("auction-section")}>
              <h3 className={cx("section-title")}>Đấu giá</h3>
              <p className={cx("time")}>
                Thời gian còn lại:{" "}
                <span className={countdownColorClass}>{timeLeft}</span>
              </p>
              <p className={cx("current-price")}>
                Giá hiện tại: <span>1.000.000</span> đ
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
