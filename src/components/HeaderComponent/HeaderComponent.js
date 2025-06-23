import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderComponent.module.scss";
import * as UserService from "../../services/UserService";
import Loading from "../LoadingComponent/Loading";
import ToastMessage from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "../../redux/slides/userSlide";
import { Popover } from "antd";
import LoginComponent from "../LoginComponent/LoginComponent";
import SignupComponent from "../SignupComponent/SignupComponent";
import Search from "../SearchComponent/SearchComponent";

const cx = classNames.bind(styles);

const HeaderComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [toast, setToast] = useState(null);

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

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    localStorage.removeItem("access_token");
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const content = (
    <div className={cx("option-user")}>
      <p onClick={handleLogout}>Đăng xuất</p>
      <p>Thông tin người dùng</p>
    </div>
  );

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
      <div className={cx("header-1")}>
        <div className={cx("logo")}>
          <a href="/">
            <img className={cx("logo-icon")} src="./image/logo.png" />
          </a>
        </div>

        <Search />

        <Loading isLoading={loading}>
          <div className={cx("User-login")}>
            {user?.name ? (
              <>
                <Popover content={content} trigger="click">
                  <div style={{ cursor: "pointer" }}>{user.name}</div>
                </Popover>
              </>
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
          </div>
        </Loading>
      </div>

      <div className={cx("header-2")}>
        <label htmlFor="header-2__nav-input" className={cx("controll")}>
          <div className={cx("navigation")}>
            <svg
              className={cx(
                "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1ceqcxd"
              )}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ViewHeadlineRoundedIcon"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M5 15h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1m0 4h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1m0-8h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1M4 6c0 .55.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1"
              ></path>
            </svg>
          </div>
        </label>

        <div className={cx("header-2")}>
          <label htmlFor="header-2__nav-input" className={cx("controll")}>
            <div className={cx("navigation")}>
              <svg
                className={cx(
                  "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1ceqcxd"
                )}
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ViewHeadlineRoundedIcon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M5 15h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1m0 4h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1m0-8h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1M4 6c0 .55.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1"
                ></path>
              </svg>
            </div>
          </label>

          <div className={cx("title")}>
            <a className={cx("title-item")}>Trang chủ</a>
            <a className={cx("title-item")}>Danh sách đặt hàng</a>
            <a className={cx("title-item")}>Đăng sản phẩm</a>
          </div>

          <div className={cx("header-2_icon")}>
            <i className={cx("fa-solid fa-cart-shopping")}></i>
          </div>

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
              <span className={cx("header-2__nav-header-title")}>
                Phân loại
              </span>
              <label htmlFor="header-2__nav-input">
                <div className={cx("header-2__nav-header-close")}>
                  <i className={cx("fa-solid fa-xmark")}></i>
                </div>
              </label>
            </div>
            <ul className={cx("header-2__nav-list")}>
              <li>
                <a href="" className={cx("header-2__nav-item")}>
                  Tài liệu
                </a>
              </li>
              <li>
                <a href="" className={cx("header-2__nav-item")}>
                  Dụng cụ
                </a>
              </li>
              <li>
                <a href="" className={cx("header-2__nav-item")}>
                  Nội thất
                </a>
              </li>
              <li>
                <a href="" className={cx("header-2__nav-item")}>
                  Đồ điện tử
                </a>
              </li>
              <li>
                <a href="" className={cx("header-2__nav-item")}>
                  Đồng phục
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {showLogin && (
          <LoginComponent
            openRegister={openRegister}
            setShowLogin={setShowLogin}
            setToast={showToast}
            handleGetDetailsUser={handleGetDetailsUser}
          />
        )}

        {showRegister && (
          <SignupComponent
            openLogin={openLogin}
            setShowRegister={setShowRegister}
            setShowLogin={setShowLogin}
            setToast={showToast}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
