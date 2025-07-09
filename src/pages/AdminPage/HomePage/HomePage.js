// src/components/AdminComponent/DashboardHomeComponent/DashboardHomeComponent.jsx
import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss'
import classNames from 'classnames/bind';
import * as UserService from '../../../services/UserService';
import * as ProductService from '../../../services/ProductService';
import imagesAdmin from '../../../assets/images/admin';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const HomePage = ({ onMenuClick }) => {
    const user = useSelector((state) => state.user);
    const [countProductCheck, setCountProductCheck] = useState()
    const [countUser, setCountUser] = useState()

    // lấy all sản phẩm chưa duyêt
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await ProductService.getAllProductCheck(user.access_token);
            setCountProductCheck(res.data.length)
        } catch (err) {
            console.error("Lỗi khi lấy sản phẩm:", err);
        }
        };
        fetchData();
    }, [])

    // lấy tất cả user 
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await UserService.getAllUser(user.access_token);
            setCountUser(res.data.length - 1)
        } catch (err) {
            console.error("Lỗi khi lấy người dùng:", err);
        }
        };
        fetchData();
    }, [])

    return (
        <div id="home" className={cx('dashboard')}>
            <div className={cx('box')} onClick={() => onMenuClick("categories")}>
                <img src={imagesAdmin.logo_list} alt="Số danh mục" />
                <span>Số danh mục</span>
                <span className={cx('count')}>5</span>
            </div>

            <div className={cx('box')} onClick={() => onMenuClick("pending")}>
                <img src={imagesAdmin.logo_don} alt="Đơn chờ duyệt"/>
                <span>Đơn chờ duyệt</span>
                <span className={cx('count')}>{countProductCheck}</span>
            </div>

            <div className={cx('box')} onClick={() => onMenuClick("account")} >
                <img src={imagesAdmin.logo_account} alt="Tài khoản" />
                <span>Tài khoản</span>
                <span className={cx('count')}>{countUser}</span>
            </div>

            <div className={cx('box')}>
                <img src={imagesAdmin.logo_infor} alt="Thông báo" />
                <span>Thông báo</span>
                <span className={cx('count')}>2</span>
            </div>
        </div>
  );
};

export default HomePage;
