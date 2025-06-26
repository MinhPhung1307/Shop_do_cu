import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProfilePage.module.scss";

const cx = classNames.bind(styles);

export default function UserProfile() {
  const [tab, setTab] = useState("info");

  return (
    <div className={cx("user-profile")}>
      <div className={cx("profile-header")}>
        <div className={cx("avatar")}>
          <img src="" alt="User avatar" />
        </div>
        <div className={cx("info")}>
          <h2>Nguyen Van A</h2>
          <p>Người dùng</p>
        </div>
      </div>

      <div className={cx("tabs")}>
        <button
          onClick={() => setTab("info")}
          className={cx(tab === "info" ? "active" : "")}
        >
          Thông tin
        </button>
        <button
          onClick={() => setTab("settings")}
          className={cx(tab === "settings" ? "active" : "")}
        >
          Cài đặt
        </button>
      </div>

      {tab === "info" && (
        <div className={cx("tab-content")}>
          <div className={cx("form-group")}>
            <label>Họ và tên</label>
            <input type="text" placeholder="Nguyen Van A" />
          </div>
          <div className={cx("form-group")}>
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" />
          </div>
          <div className={cx("form-group")}>
            <label>Số điện thoại</label>
            <input type="text" placeholder="0123456789" />
          </div>
          <div className={cx("form-group")}>
            <label>Địa chỉ</label>
            <input type="text" placeholder="123 Nguyễn Văn Cừ, Quận 5" />
          </div>
          <div className={cx("form-footer")}>
            <button className={cx("primary-btn")}>Lưu thay đổi</button>
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div className={cx("tab-content")}>
          <div className={cx("form-group")}>
            <label>Mật khẩu cũ</label>
            <input type="password" placeholder="••••••" />
          </div>
          <div className={cx("form-group")}>
            <label>Mật khẩu mới</label>
            <input type="password" placeholder="••••••" />
          </div>
          <div className={cx("form-group")}>
            <label>Nhập lại mật khẩu mới</label>
            <input type="password" placeholder="••••••" />
          </div>
          <div className={cx("form-footer")}>
            <button className={cx("primary-btn")}>Cập nhật mật khẩu</button>
          </div>
        </div>
      )}
    </div>
  );
}
