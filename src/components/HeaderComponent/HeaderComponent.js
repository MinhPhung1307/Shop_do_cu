import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderComponent.module.scss";
import * as UserService from "../../services/UserService";
import * as NotificationService from "../../services/NotificationService";
import Loading from "../LoadingComponent/Loading";
import ToastMessage from "../../components/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "../../redux/slides/userSlide";
import { setSearchProducts } from "../../redux/slides/productSlide";
import LoginComponent from "../LoginComponent/LoginComponent";
import SignupComponent from "../SignupComponent/SignupComponent";
import Search from "../SearchComponent/SearchComponent";
import Menu from "../Popper/Menu/Menu";
import Image from "../Image/Image";
import images from "../../assets/images";
import imagesAdmin from "../../assets/images/admin/index";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const cx = classNames.bind(styles);

const HeaderComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [toast, setToast] = useState(null);

  const [notifications, setNotifications] = useState([]); // <--- DÒNG NÀY CẦN ĐƯỢC THÊM
  const [unreadCount, setUnreadCount] = useState(0); // <--- DÒNG NÀY CẦN ĐƯỢC THÊM

  const showToast = (type, title, message, duration = 3000) => {
    setToast({ type, title, message, duration });
  };

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  // kiểm tra màn hình có ở mobile không
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 739);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hàm lấy thông báo
  const fetchNotifications = async () => {
    if (user?.access_token && user?.id) {
      try {
        const res = await NotificationService.getNotifications(
          user.id,
          user.access_token
        );
        if (res?.status === "OK") {
          const list = res.data;
          setNotifications(list);
          setUnreadCount(list.filter((notif) => !notif.read).length);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    } else {
      // Clear notifications if user logs out or token is invalid
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  // Effect để fetch thông báo khi người dùng đăng nhập hoặc token thay đổi
  useEffect(() => {
    fetchNotifications();
    // Thiết lập một khoảng thời gian để thăm dò thông báo mới (ví dụ: mỗi 60 giây)
    // Đối với ứng dụng thời gian thực hơn, bạn có thể cân nhắc dùng WebSockets
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [user?.id, user?.access_token]); // Phụ thuộc vào ID và token của người dùng

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    localStorage.removeItem("access_token");
    setNotifications([]); // Xóa thông báo khi đăng xuất
    setUnreadCount(0); // Đặt lại số lượng chưa đọc
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token })); // lưu thông tin đăng nhập
  };

  // Hàm đánh dấu thông báo là đã đọc
  const handleMarkNotificationAsRead = async (notificationId) => {
    try {
      const res = await NotificationService.markNotificationAsRead(
        notificationId,
        user.access_token
      );
      console.log("API Response:", res);
      // 1) Kiểm tra status đúng với backend (thường là "success")
      if (res?.status === "success") {
        // 2) Cập nhật trực tiếp trong state để badge giảm ngay
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
        // 3) (tuỳ chọn) vẫn có thể gọi fetchNotifications() để đồng bộ
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Hàm trợ giúp để hiển thị nội dung thông báo trong menu
  const renderNotificationContent = (notification) => {
    return (
      <div
        key={notification._id}
        className={cx("notification-item", { unread: !notification.read })}
        onClick={() => handleMarkNotificationAsRead(notification._id)}
      >
        <h4>{notification.title}</h4>
        <p>{notification.message}</p>{" "}
        <span className={cx("notification-time")}>
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    );
  };

  // Tạo các mục menu cho thông báo
  const NOTIFICATION_MENU_ITEMS =
    notifications.length > 0
      ? notifications.map((notif) => ({
          // Thay vì chỉ truyền string, bây giờ truyền nguyên một React node
          title: (
            <div className={cx("notification-wrapper")}>
              <div
                className={cx("notification-item", { unread: !notif.read })}
                onClick={() => {
                  handleMarkNotificationAsRead(notif._id);
                  if (notif.productId) navigate(`/digital/${notif.productId}`);
                }}
              >
                <h4 className={cx("notification-title")}>{notif.title}</h4>
                <p className={cx("notification-message")}>{notif.message}</p>
                <span className={cx("notification-time")}>
                  {new Date(notif.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ),
          // callback vẫn cần để Menu biết có thể click
          callback: () => {
            handleMarkNotificationAsRead(notif._id);
            if (notif.productId) navigate(`/digital/${notif.productId}`);
          },
        }))
      : [
          {
            title: (
              <div className={cx("notification-empty")}>
                Không có thông báo nào.
              </div>
            ),
            disabled: true,
          },
        ];

  const MENU_ITEMS = [];

  if (isMobile && !user?.access_token) {
    MENU_ITEMS.push(
      {
        icon: <i className={"fa-solid fa-right-to-bracket"}></i>,
        title: "Đăng nhập",
        callback: () => setShowLogin(true),
      },
      {
        icon: <i className={"fa-solid fa-user-plus"}></i>,
        title: "Đăng ký",
        callback: () => setShowRegister(true),
      }
    );
  } else if (user?.access_token) {
    if (user.isAdmin) {
      MENU_ITEMS.push(
        {
          icon: <i className="fa-solid fa-shield-halved"></i>,
          title: "Quản lý hệ thống",
          callback: () => navigate("/admin"),
        },
        {
          icon: <i className={"fa-solid fa-right-from-bracket"}></i>,
          title: "Đăng xuất",
          callback: handleLogout,
        }
      );
    } else {
      MENU_ITEMS.push(
        {
          icon: <i className={cx("fa-solid fa-user")}></i>,
          title: "Thông tin cá nhân",
          callback: () => navigate("/profile"),
        },
        {
          icon: <i className={"fa-solid fa-right-from-bracket"}></i>,
          title: "Đăng xuất",
          callback: handleLogout,
        }
      );
    }
  }

  const products = useSelector((state) => state.product.products);

  const handleSearch = (query) => {
    if (!query) {
      return;
    }
    // lộc sản phẩm theo giá trị trong ô tìm kiếm
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(setSearchProducts(filtered));
  };
  return (
    <div className={cx("header")}>
      {toast && (
        <ToastMessage
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}

      {/* header row 1 */}
      <div className={cx("header-1")}>
        <div className={cx("logo")}>
          <a onClick={() => navigate("/")}>
            <img className={cx("logo-icon")} src={images.logo} />
          </a>
        </div>

        <Search products={products} />

        <Loading isLoading={loading} className={cx("User-login")}>
          <div className={cx("user-notification-wrapper")}>
            {user?.access_token ? (
              <Menu items={MENU_ITEMS}>
                <div className={cx("user-wrapper")}>
                  <Image
                    src={
                      user?.isAdmin
                        ? imagesAdmin.avatar
                        : user?.avatar || images.avatar
                    }
                    className={cx("user-avatar")}
                    alt={user.name}
                    fallback={images.avatar}
                  />
                  <span>{user.name}</span>
                </div>
              </Menu>
            ) : isMobile ? (
              <Menu items={MENU_ITEMS}>
                <div className={cx("user-wrapper")}>
                  <Image
                    src={images.noImage}
                    className={cx("user-avatar")}
                    alt={user.name}
                    fallback={images.avatar}
                  />
                  <span>{user.name}</span>
                </div>
              </Menu>
            ) : (
              <div>
                <button
                  className={cx("btn", "registerBtn")}
                  onClick={openRegister}
                >
                  Đăng ký
                </button>
                <button className={cx("btn", "loginBtn")} onClick={openLogin}>
                  Đăng nhập
                </button>
              </div>
            )}

            <Menu
              items={NOTIFICATION_MENU_ITEMS}
              onChange={handleMarkNotificationAsRead}
              className={cx("notification-menu-list")}
            >
              <div className={cx("notification-bell")}>
                <i className="fa-solid fa-bell"></i>
                {unreadCount > 0 && (
                  <span className={cx("notification-badge")}>
                    {unreadCount}
                  </span>
                )}
              </div>
            </Menu>
          </div>
        </Loading>
      </div>

      {/* header row 2 */}
      <div className={cx("header-2")}>
        <div className={cx("title")}>
          <a onClick={() => navigate("/")} className={cx("title-item")}>
            Trang chủ
          </a>
          <a onClick={() => navigate("/order")} className={cx("title-item")}>
            Danh sách đặt hàng
          </a>
          <a
            onClick={() => navigate("/push-product")}
            className={cx("title-item")}
          >
            Đăng sản phẩm
          </a>
        </div>

        {!isMobile && (
          <label htmlFor="header-2__nav-input" className={cx("controll")}>
            <div className={cx("navigation", "title-item")}>Phân loại</div>
          </label>
        )}

        {isMobile && (
          <label
            htmlFor="header-2__nav-input"
            className={cx("controll", "icon-bars")}
          >
            <i class="fa-solid fa-bars"></i>
          </label>
        )}

        <a onClick={() => navigate("/cartpage")} className={cx("title-item")}>
          <div className={cx("header-2_icon")}>
            <i className={cx("fa-solid fa-cart-shopping")}></i>
          </div>
        </a>
        <input
          type="checkbox"
          className={cx("header-2__nav-input")}
          id="header-2__nav-input"
        />
        <label
          htmlFor="header-2__nav-input"
          className={cx("header-2__navOverlay")}
        ></label>
        <nav className={cx("header-2__nav")}>
          <div className={cx("header-2__nav-header")}>
            <span className={cx("header-2__nav-header-title")}>Phân loại</span>
            <label htmlFor="header-2__nav-input">
              <div className={cx("header-2__nav-header-close")}>
                <i className={cx("fa-solid fa-xmark")}></i>
              </div>
            </label>
          </div>
          <ul className={cx("header-2__nav-list")}>
            {isMobile && (
              <>
                <li>
                  <Link to="/" className={cx("header-2__nav-item")}>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/order" className={cx("header-2__nav-item")}>
                    Danh sách đặt hàng
                  </Link>
                </li>
                <li>
                  <Link to="/push-product" className={cx("header-2__nav-item")}>
                    Đăng sản phẩm
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/ProductListDocument"
                className={cx("header-2__nav-item")}
              >
                Tài liệu
              </Link>
            </li>
            <li>
              <Link to="/ProductListTool" className={cx("header-2__nav-item")}>
                Dụng cụ
              </Link>
            </li>
            <li>
              <Link
                to="/ProductListInterior"
                className={cx("header-2__nav-item")}
              >
                Nội thất
              </Link>
            </li>
            <li>
              <Link
                to="/ProductListElectronics"
                className={cx("header-2__nav-item")}
              >
                Đồ điện tử
              </Link>
            </li>
            <li>
              <Link
                to="/ProductListUniform"
                className={cx("header-2__nav-item")}
              >
                Đồng phục
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* form login */}
      {showLogin && (
        <LoginComponent
          openRegister={openRegister}
          setShowLogin={setShowLogin}
          setToast={showToast}
          handleGetDetailsUser={handleGetDetailsUser}
        />
      )}

      {/* form sign up */}
      {showRegister && (
        <SignupComponent
          openLogin={openLogin}
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
          setToast={showToast}
        />
      )}
    </div>
  );
};

export default HeaderComponent;
