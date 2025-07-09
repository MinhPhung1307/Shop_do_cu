import React, { useState, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./ProductDigital.module.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { markAsSold } from "../../services/ProductService"; // Đảm bảo đường dẫn đúng đến file ProductService.js của bạn
const cx = classNames.bind(styles);

export default function Digital() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id || "";

  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user);
  console.log("Redux User State (từ Digital.jsx):", user);
  // Tìm sản phẩm theo id
  const productitem = useMemo(() => {
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

  const [mainImage, setMainImage] = useState("");

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
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [countdownColorClass, setCountdownColorClass] = useState(
    cx("countdown-normal-color")
  ); // Mặc định khởi tạo là class cho màu đen
  // *** ĐÂY LÀ PHẦN CHỈNH SỬA CHO HÀM TÍNH THỜI GIAN ***
  // Sử dụng useMemo để tính toán nguồn thời gian kết thúc đấu giá
  // Ưu tiên auctionEndTime nếu có, nếu không thì dùng createdAt + 48 giờ
  const auctionEndTimeSource = useMemo(() => {
    if (productitem?.auctionEndTime) {
      return new Date(productitem.auctionEndTime);
    }
    if (productitem?.createdAt) {
      return new Date(
        new Date(productitem.createdAt).getTime() + 48 * 60 * 60 * 1000
      );
    }
    return null; // Không có nguồn thời gian hợp lệ
  }, [productitem?.auctionEndTime, productitem?.createdAt]); // Dependency array cho useMemo

  useEffect(() => {
    if (!auctionEndTimeSource) {
      setTimeLeft("00 : 00 : 00");
      setCountdownColorClass(cx("countdown-expired-color"));
      setIsAuctionEnded(true);
      return;
    }

    const calculateTimeLeft = () => {
      // Sử dụng auctionEndTimeSource để tính toán thời gian còn lại
      const difference = auctionEndTimeSource.getTime() - new Date().getTime();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (Object.keys(newTimeLeft).length === 0) {
        setTimeLeft("00 : 00 : 00");
        setCountdownColorClass(cx("countdown-expired-color"));
        setIsAuctionEnded(true);
        clearInterval(timer);
      } else {
        const hours = String(newTimeLeft.hours || 0).padStart(2, "0");
        const minutes = String(newTimeLeft.minutes || 0).padStart(2, "0");
        const seconds = String(newTimeLeft.seconds || 0).padStart(2, "0");

        // Cập nhật class màu dựa trên số giờ
        if (newTimeLeft.hours <= 1 && newTimeLeft.hours >= 0) {
          // Kiểm tra >= 0 để đảm bảo vẫn là thời gian hợp lệ
          setCountdownColorClass(cx("countdown-urgent-color"));
        } else {
          setCountdownColorClass(cx("countdown-normal-color"));
        }

        setTimeLeft(`${hours} : ${minutes} : ${seconds}`);
        setIsAuctionEnded(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auctionEndTimeSource]); // Dependency array: useEffect này chạy lại khi auctionEndTimeSource thay đổi
  const [bidAmount, setBidAmount] = useState(""); // giá trị đấu giá
  const [isLoadingBid, setIsLoadingBid] = useState(false); // Thêm state để quản lý trạng thái loading

  const handlePlaceBid = async () => {
    // 1. Kiểm tra dữ liệu đầu vào
    if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
      alert("Vui lòng nhập giá đấu hợp lệ");
      return;
    }
    if (!user?.id) {
      alert("Vui lòng đăng nhập để đặt giá.");
      return;
    }
    if (!productitem?._id) {
      alert("Không tìm thấy sản phẩm để đặt giá.");
      return;
    }

    setIsLoadingBid(true); // Bắt đầu trạng thái loading

    try {
      // 2. Chuẩn bị dữ liệu để gửi trong body
      const bidData = {
        amount: Number(bidAmount),
        bidderId: user.id,
        // Không cần productId ở đây vì nó đã có trong URL
      };
      console.log("amount:", bidData.amount);
      console.log("bidderId:", user.id);

      // 3. Gọi API bằng fetch
      const response = await fetch(
        `http://localhost:3001/api/product/bid/${productitem._id}`, // <-- URL API ĐẶT GIÁ CHÍNH XÁC
        {
          method: "PUT", // <-- Phương thức HTTP là PUT
          headers: {
            "Content-Type": "application/json", // <-- RẤT QUAN TRỌNG: Báo cho server biết body là JSON
            // Nếu bạn có token xác thực người dùng, hãy thêm nó vào đây
            // 'Authorization': `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(bidData), // <-- Chuyển đổi đối tượng JavaScript thành chuỗi JSON
        }
      );

      // 4. Xử lý phản hồi từ server
      const result = await response.json();

      if (result.status === "OK") {
        alert("Đặt giá thành công!");
        setBidAmount(""); // Xóa giá trị trong input sau khi đặt giá thành công
        // TODO: Bạn có thể cần fetch lại dữ liệu sản phẩm để cập nhật danh sách đấu giá trên UI
        // hoặc dispatch một action Redux nếu bạn quản lý trạng thái sản phẩm trong Redux store.
        window.location.reload();
        console.log("Phản hồi đặt giá:", result);
        console.log("giờ", timeLeft);
      } else {
        // Lỗi từ phía server (ví dụ: giá không đủ lớn, sản phẩm không tồn tại)
        alert(result.message || "Có lỗi xảy ra khi đặt giá.");
      }
    } catch (error) {
      // Lỗi mạng, lỗi parse JSON, hoặc các lỗi không mong muốn khác
      console.error("Lỗi khi gửi yêu cầu đặt giá:", error);
      alert("Lỗi hệ thống khi đặt giá. Vui lòng thử lại.");
    } finally {
      setIsLoadingBid(false); // Kết thúc trạng thái loading dù thành công hay thất bại
    }
  };
  const [bidderNames, setBidderNames] = useState({}); // tên người đấu giá
  // useEffect để fetch tên người đấu giá
  useEffect(() => {
    const fetchBidderNames = async () => {
      if (!productitem?.bids || productitem.bids.length === 0) {
        setBidderNames({});
        return;
      }

      // Lấy tất cả các bidderId duy nhất từ mảng bids
      const uniqueBidderIds = [
        ...new Set(productitem.bids.map((bid) => bid.bidderId)),
      ];
      const newBidderNames = {};
      const fetchPromises = uniqueBidderIds.map(async (bidderId) => {
        // Tránh fetch lại nếu đã có tên người đấu giá này
        if (bidderNames[bidderId]) {
          newBidderNames[bidderId] = bidderNames[bidderId];
          return;
        }
        try {
          const res = await fetch(
            `http://localhost:3001/api/user/public/${bidderId}`
          );
          const result = await res.json();
          if (result.status === "OK" && result.data && result.data.name) {
            newBidderNames[bidderId] = result.data.name;
          } else {
            newBidderNames[bidderId] = "Người dùng ẩn danh"; // Tên dự phòng nếu không lấy được
            console.warn(
              `Không lấy được tên người đấu giá cho ID ${bidderId}:`,
              result.message
            );
          }
        } catch (err) {
          newBidderNames[bidderId] = "Người dùng ẩn danh"; // Tên dự phòng khi có lỗi
          console.error(
            `Lỗi khi lấy tên người đấu giá cho ID ${bidderId}:`,
            err
          );
        }
      });

      await Promise.all(fetchPromises);
      // Cập nhật state bidderNames, giữ lại các tên đã có và thêm các tên mới
      setBidderNames((prevNames) => ({ ...prevNames, ...newBidderNames }));
    };

    fetchBidderNames();
  }, [productitem?.bids]); // Dependency array: re-run khi bids array thay đổi
  // tính giá cao nhất
  const currentHighestPrice = useMemo(() => {
    if (productitem?.bids && productitem.bids.length > 0) {
      // Tìm giá cao nhất trong mảng bids
      const highestBid = Math.max(...productitem.bids.map((bid) => bid.amount));
      return highestBid;
    }
    // Nếu không có lượt đấu giá nào, giá hiện tại là giá khởi điểm của sản phẩm
    // Đảm bảo productitem.price tồn tại, nếu không thì mặc định là 0 hoặc giá khởi tạo khác.
    return productitem?.price || 0;
  }, [productitem?.bids, productitem?.price]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const handleSubmit = async () => {
    setIsLoadingSubmit(true); // Bắt đầu loading, vô hiệu hóa nút

    try {
      // Đảm bảo productitem và user có đủ thông tin cần thiết
      if (!productitem || !user || !user.id || !user.access_token) {
        alert(
          "Thông tin sản phẩm hoặc người dùng không đầy đủ để hoàn tất giao dịch."
        );
        setIsLoadingSubmit(false);
        return;
      }

      // Lấy giá cuối cùng của sản phẩm (giá cao nhất sau đấu giá hoặc giá mua trực tiếp)
      const finalPrice = productitem.priceCurrent || productitem.price;

      // 2. Gửi yêu cầu API để đánh dấu sản phẩm đã bán
      const response = await markAsSold(
        productitem._id, // ID sản phẩm
        user.id, // ID người mua (lấy từ user Redux state)
        finalPrice, // Giá cuối cùng của giao dịch
        user.access_token // Token xác thực của người mua
      );

      if (response.status === "OK") {
        alert("Giao dịch thành công! Sản phẩm đã được đánh dấu là đã bán.");
        // TODO: Cập nhật lại UI hoặc Redux store sau khi sản phẩm đã bán
        // Ví dụ: Bạn có thể điều hướng người dùng đến trang lịch sử mua hàng
        // navigate('/my-purchases');
        // Hoặc dispatch một action để cập nhật trạng thái sản phẩm trong Redux
      } else {
        alert(`Đã xảy ra lỗi khi hoàn tất giao dịch: ${response.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái sản phẩm:", error);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái sản phẩm.");
    } finally {
      setIsLoadingSubmit(false); // Dù thành công hay thất bại, kết thúc loading
    }
  };
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
            <button
              className={cx("btn-primary", "buy-button")}
              onClick={handleSubmit}
            >
              Mua ngay
            </button>
            <div className={cx("related-section")}>
              <h3 className={cx("section-title")}>Sản phẩm liên quan</h3>
              <div className={cx("related-grid")}>
                {relatedProducts.map((prod) => (
                  <CardComponent
                    key={prod._id}
                    product={prod}
                    onClick={() => navigate(`/digital/${prod._id}`)}
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
                Giá hiện tại:{" "}
                <span>
                  {Number(currentHighestPrice).toLocaleString("vi-VN")}
                </span>{" "}
                VNĐ
              </p>
              <div className={cx("bid-input")}>
                <input
                  type="number"
                  onChange={(e) => setBidAmount(e.target.value)}
                  value={bidAmount}
                  placeholder="10000"
                  className={cx("bid-field")}
                  disabled={isAuctionEnded || isLoadingBid}
                />
                <button
                  className={cx("btn-outline", "bid-button")}
                  onClick={handlePlaceBid}
                  disabled={isAuctionEnded || isLoadingBid}
                >
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
                  {/* Hiển thị danh sách đấu giá động */}
                  {productitem?.bids && productitem.bids.length > 0 ? (
                    // Sắp xếp bids để hiển thị giá cao nhất trước
                    // hoặc nếu muốn hiển thị lượt đấu giá mới nhất, không cần sort
                    // Hiện tại, ProductService dùng unshift, nên bid mới nhất ở đầu.
                    // Để hiển thị giá cao nhất: sort theo amount giảm dần.
                    // Để hiển thị mới nhất lên đầu: sort theo timestamp giảm dần (hoặc không sort nếu unshift đã đảm bảo)
                    [...productitem.bids]
                      .sort((a, b) => b.amount - a.amount) // Sắp xếp giá giảm dần
                      .map((bid, index) => (
                        <tr key={index} className={cx("infor__auction")}>
                          {/* `bidderId` là ID, nếu muốn hiển thị tên người đấu giá, bạn cần fetch thông tin user từ backend */}
                          <td>{bidderNames[bid.bidderId] || "Đang tải..."}</td>
                          <td>
                            {Number(bid.amount).toLocaleString("vi-VN")}
                            <span> VNĐ</span>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="2">Chưa có lượt đấu giá nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
