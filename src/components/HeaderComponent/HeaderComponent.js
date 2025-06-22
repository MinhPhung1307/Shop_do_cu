import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderComponent.module.scss";
import axios from "axios";
import Search from "../SearchComponent/SearchComponent";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import ToastMessage from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "../../redux/slides/userSlide";
import { Popover } from "antd";

const cx = classNames.bind(styles);

const HeaderComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [MSSV, setMSSV] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  const [toast, setToast] = useState(null);

  const showToast = (type, title, message, duration = 3000) => {
    setToast({ type, title, message, duration });
  };

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      setShowLogin(false);
      showToast("success", "Thành công", "Đăng nhập thành công!");
      setMSSV("");
      setPassword("");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    } else if (isError || data?.status === "ERR") {
      showToast("error", "Thất bại", "Sai tài khoản hoặc mật khẩu");
    }
  }, [isSuccess, isError, data]);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeLogin = () => setShowLogin(false);
  const closeRegister = () => setShowRegister(false);

  const handleOverlayClick = (e, closeFn) => {
    if (e.target === e.currentTarget) {
      closeFn();
    }
  };

  const handleLogin = () => {
    mutation.mutate({ MSSV, password });
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    localStorage.removeItem("access_token");
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
            <span className={cx("header-2__nav-header-title")}>Phân loại</span>
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
        <div
          className={cx("login-container")}
          onClick={(e) => handleOverlayClick(e, closeLogin)}
        >
          <div className={cx("login")}>
            <div className={cx("login__header")}>
              <span className={cx("login__heading")}>Đăng nhập</span>
              <span
                id="login__switchBtn"
                className={cx("login__switchBtn")}
                onClick={openRegister}
              >
                Đăng Ký
              </span>
            </div>

            <img src="./image/logo.png" alt="logo" />
            <input
              name="user"
              type="text"
              placeholder="Nhập MSSV hoặc mã GV"
              value={MSSV}
              onChange={(e) => setMSSV(e.target.value)}
            />
            <div style={{ position: "relative" }}>
              <input
                className={cx("inputPassword")}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <div
                  className={cx("icon-hide")}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i class="fa-solid fa-eye"></i>
                </div>
              ) : (
                <div
                  className={cx("icon-show")}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i class="fa-solid fa-eye-slash"></i>
                </div>
              )}
            </div>
            {data?.status === "ERR" && (
              <span style={{ color: "red" }}>{data?.message}</span>
            )}
            <Loading isLoading={isPending}>
              <button
                className={cx("login__submitBtn")}
                type="submit"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </Loading>
            <button className={cx("login__backBtn")} onClick={closeLogin}>
              <span>Trở lại</span>
            </button>
          </div>
        </div>
      )}

      {showRegister && (
        <div
          className={cx("register-container")}
          onClick={(e) => handleOverlayClick(e, closeRegister)}
        >
          <div className={cx("login")}>
            <div className={cx("login__header")}>
              <span className={cx("login__heading")}>Đăng Ký</span>
              <span
                id="register__switchBtn"
                className={cx("login__switchBtn")}
                onClick={openLogin}
              >
                Đăng nhập
              </span>
            </div>
            <img src="/image/logo.png" alt="logo" />
            <input name="user" type="text" placeholder="Nhập MSSV hoặc mã GV" />
            <input name="password" type="password" placeholder="Mật khẩu" />
            <input
              name="re-enter__password"
              type="password"
              placeholder="Nhập lại Mật khẩu"
            />
            <input name="address" type="text" placeholder="Nhập địa chỉ" />
            <input
              name="phoneNumber"
              type="text"
              placeholder="Nhập số điện thoại"
            />
            <button className={cx("login__submitBtn")} type="submit">
              Đăng Ký
            </button>
            <button
              id="register__backBtn"
              className={cx("login__backBtn")}
              onClick={closeRegister}
            >
              <span>Trở lại</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
