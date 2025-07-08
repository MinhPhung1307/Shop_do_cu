import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProfilePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import images from "../../assets/images";
import { updateUser as updateUserReDux } from "../../redux/slides/userSlide";
import ToastMessage from "../../components/Message/Message";

const cx = classNames.bind(styles);

export default function UserProfile() {
  const [tab, setTab] = useState("info");
  const user = useSelector(state => state.user);
  const userName = user.name;
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user?.email)
  const [formData, setFormData] = useState({
    name: user?.name,
    phone: user?.phone,
    address: user?.address,
    image: user?.avatar,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [curPassword, setCurPassword] = useState()
  const [showCurPassword, setShowCurPassword] = useState(false)
  const [newPassword, setNewPassword] = useState()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [toast, setToast] = useState(null);
  
  const showToast = (type, title, message, duration = 3000) => {
    setToast({ type, title, message, duration });
  };
  

  useEffect(() => {
    setFormData({
      name: user.name,
      phone: user.phone,
      address: user.address,
      image: user.avatar
    })
    setEmail(user.email)
  }, [user]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUserReDux({ ...res?.data, access_token: token }));
  };
  
  const fileInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      setSelectedFile(file);
    }
  };

  const handleUpdateUser = async () => {
    const res = await UserService.updateUser(user.id, formData, user.access_token);
    handleGetDetailsUser(user?.id, user?.access_token);
    if(res.status === 'OK'){
      showToast('success', 'Thành công', res?.message);
    }else {
      showToast('error', 'Thất bại', res?.message);
    }
  }

  const handleUpdatePassword = async () => {
    const data = { curPassword, newPassword, confirmPassword };
    const res = await UserService.updatePassword(user.id, data , user.access_token);
    if(res.status === 'OK'){
      showToast('success', 'Thành công', res?.message);
      setCurPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }else {
      showToast('error', 'Thất bại', res?.message);
    }
  }

  return (
    <div className={cx("user-profile")}>
      {toast && (
        <ToastMessage
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}

      <div className={cx("profile-header")}>
        <div className={cx("avatar-wrapper")}>
          <img className={cx("avatar")} src={formData.image ? formData.image : images.avatar} alt="User avatar" />
          <div className={cx("avatar-change")} onClick={() => fileInputRef.current?.click?.()}>Chọn ảnh</div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className={cx("info")}>
          <h2>{userName}</h2>
          <p>{user.isAdmin ? 'Admin' : 'Người dùng'}</p>
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
          Đổi mật khẩu
        </button>
      </div>

      {tab === "info" && (
        <div className={cx("tab-content")}>
          <div className={cx("form-group")}>
            <label>Họ và tên</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className={cx("form-group")}>
            <label>Email</label>
            <input type="email" value={email} className={cx('disable')}/>
          </div>
          <div className={cx("form-group")}>
            <label>Số điện thoại</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}/>
          </div>
          <div className={cx("form-group")}>
            <label>Địa chỉ</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}/>
          </div>
          <div className={cx("form-footer")}>
            <button className={cx("primary-btn")} onClick={handleUpdateUser}>Lưu thay đổi</button>
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div className={cx("tab-content")}>
          <div className={cx("form-group")}>
            <label>Mật khẩu cũ</label>
            <input 
              className={cx('input')}
              type={showCurPassword ? "text" : "password"} 
              placeholder="••••••" 
              value={curPassword}
              onChange={(e) => setCurPassword(e.target.value)}
            />
            {showCurPassword ? (
              <div
                  className={cx("icon-hide")}
                  onClick={() => setShowCurPassword(!showCurPassword)}
                >
                  <i className="fa-solid fa-eye"></i>
                </div>
              ) : (
                <div
                  className={cx("icon-show")}
                  onClick={() => setShowCurPassword(!showCurPassword)}
                >
                  <i className="fa-solid fa-eye-slash"></i>
                </div>
            )}
          </div>
          <div className={cx("form-group")}>
            <label>Mật khẩu mới</label>
            <input 
              className={cx('input')}
              type={showNewPassword ? "text" : "password"} 
              placeholder="••••••" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} 
            />
            {showNewPassword ? (
              <div
                className={cx("icon-hide")}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <i className="fa-solid fa-eye"></i>
              </div>
            ) : (
                <div
                  className={cx("icon-show")}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <i className="fa-solid fa-eye-slash"></i>
                </div>
            )}
          </div>
          <div className={cx("form-group")}>
            <label>Nhập lại mật khẩu mới</label>
            <input 
              className={cx('input')}
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}  
            />
            {showConfirmPassword ? (
              <div
                className={cx("icon-hide")}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className="fa-solid fa-eye"></i>
              </div>
            ) : (
                <div
                  className={cx("icon-show")}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className="fa-solid fa-eye-slash"></i>
                </div>
            )}
          </div>
          <div className={cx("form-footer")}>
            <button className={cx("primary-btn")} onClick={handleUpdatePassword}>Cập nhật mật khẩu</button>
          </div>
        </div>
      )}
    </div>
  );
}
