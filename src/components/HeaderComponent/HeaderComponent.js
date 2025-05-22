import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderComponent.module.scss'

const cx = classNames.bind(styles);

const HeaderComponent = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

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
    

    return (
        <div className={cx('header')}>
            <div className={cx('header-1')}>
                <div className={cx('logo')}>
                    <a href="/"><img className={cx('logo-icon')} src="./image/logo.png"/></a>
                </div>
            
                <div className={cx('search')}>  
                    <input className={cx('search-input')} placeholder="Nhập tên sản phẩm" />
                    <button className={cx('search-btn')}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
    
                <div>
                    <button className={cx('btn', 'registerBtn')} onClick={openRegister}>Đăng ký</button>
                    <button className={cx('btn', 'loginBtn')} onClick={openLogin}>Đăng nhập</button>
                </div>
            </div> 

            <div className={cx('header-2')}>
                <label for="header-2__nav-input" className={cx('controll')}>
                    <div  className={cx('navigation')} >
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1ceqcxd" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ViewHeadlineRoundedIcon">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M5 15h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1m0 4h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1m0-8h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1M4 6c0 .55.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1">
                            </path>
                        </svg>
                    </div>
                </label>

                <div className={cx('title')}>
                    <a className={cx('title-item')}>Trang chủ</a>
                    <a className={cx('title-item')}>Danh sách đặt hàng</a>
                    <a className={cx('title-item')}>Đăng sản phẩm</a>
                </div>

                <div className={cx('header-2_icon')}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>

                <input type="checkbox" className={cx('header-2__nav-input')} id="header-2__nav-input" />
                <label for="header-2__nav-input" className={cx('header-2__navOverlay')}></label>
                <nav className={cx('header-2__nav')}>
                    <div className={cx('header-2__nav-header')}>
                        <span className={cx('header-2__nav-header-title')}>Phân loại</span>
                        <label for="header-2__nav-input">
                            <div className={cx('header-2__nav-header-close')}><i class="fa-solid fa-xmark"></i></div>
                        </label>
                    </div>
                    <ul className={cx('header-2__nav-list')}>
                        <li><a href="" className={cx('header-2__nav-item')}>Tài liệu</a></li>
                        <li><a href="" className={cx('header-2__nav-item')}>Dụng cụ</a></li>
                        <li><a href="" className={cx('header-2__nav-item')}>Nội thất</a></li>
                        <li><a href="" className={cx('header-2__nav-item')}>Đồ điện tử</a></li>
                        <li><a href="" className={cx('header-2__nav-item')}>Đồng phục</a></li>
                    </ul>
                </nav>
            </div>

            {showLogin && (<div className={cx('login-container')} onClick={(e) => handleOverlayClick(e, closeLogin)}>
                <div className={cx('login')}>
                    <div className={cx('login__header')}>
                        <span className={cx('login__heading')}>Đăng nhập</span>
                        <span id="login__switchBtn" className={cx('login__switchBtn')} onClick={openRegister}>Đăng Ký</span>
                    </div>

                    <img src="./image/logo.png" alt="logo" />
                    <input name="user" type="text" placeholder="Nhập MSSV hoặc mã GV" />
                    <input name="password" type="password" placeholder="Mật khẩu" />
                    <button className={cx('login__submitBtn')} type="submit">Đăng nhập</button>
                    <button className={cx('login__backBtn')} onClick={closeLogin}><span>Trở lại</span></button>
                </div>
            </div>)}

            {showRegister && (<div className={cx('register-container')} onClick={(e) => handleOverlayClick(e, closeRegister)}>
                <div className={cx('login')}>
                    <div className={cx('login__header')}>
                        <span className={cx('login__heading')}>Đăng Ký</span>
                        <span id="register__switchBtn" className={cx('login__switchBtn')} onClick={openLogin}>Đăng nhập</span>
                    </div>
                    <img src="/image/logo.png" alt="logo" />
                    <input name="user" type="text" placeholder="Nhập MSSV hoặc mã GV" />
                    <input name="password" type="password" placeholder="Mật khẩu" />
                    <input name="re-enter__password" type="password" placeholder="Nhập lại Mật khẩu" />
                    <input name="address" type="text" placeholder="Nhập địa chỉ" />
                    <input name="phoneNumber" type="text" placeholder="Nhập số điện thoại" />
                    <button className={cx('login__submitBtn')} type="submit">Đăng Ký</button>
                    <button id="register__backBtn" className={cx('login__backBtn')} onClick={closeRegister}><span>Trở lại</span></button>
                </div>
            </div>)}
        </div>
    )
}

export default HeaderComponent;

