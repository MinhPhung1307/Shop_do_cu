import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./LoginComponent.module.scss";
import Loading from "../LoadingComponent/Loading";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import images from "../../assets/images";

const cx = classNames.bind(styles);

const LoginComponent = ({
  setShowLogin,
  setToast,
  handleGetDetailsUser,
  openRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);

  // Mutation
  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  const handleLogin = () => {
    mutation.mutate({ email, password });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      setShowLogin(false);
      setToast("success", "Thành công", "Đăng nhập thành công!");
      setEmail("");
      setPassword("");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    } else if (isError || data?.status === "ERR") {
      setToast("error", "Thất bại", data?.message || "Sai tài khoản hoặc mật khẩu");
    }
  }, [isSuccess, isError, data]);

  return (
    <div
      className={cx("login-container")}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setShowLogin(false);
      }}
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

        <img src={images.logo} alt="logo" />

        <div className={cx("form-group")}>
          <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="username">Tài khoản đăng nhập</label>
        </div>

        <div className={cx("form-group")}>
          <input
            id="password"
            className={cx("inputPassword")}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for="password">Mật khẩu</label>
          {showPassword ? (
            <div
              className={cx("icon-hide")}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className="fa-solid fa-eye"></i>
            </div>
          ) : (
            <div
              className={cx("icon-show")}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className="fa-solid fa-eye-slash"></i>
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
        <button
          className={cx("login__backBtn")}
          onClick={() => setShowLogin(false)}
        >
          <span>Trở lại</span>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
