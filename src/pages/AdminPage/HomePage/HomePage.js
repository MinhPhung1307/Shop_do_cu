// src/components/AdminComponent/DashboardHomeComponent/DashboardHomeComponent.jsx
import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss'
import classNames from 'classnames/bind';
import * as UserService from '../../../services/UserService';
import * as ProductService from '../../../services/ProductService';
import * as NotificationService from '../../../services/NotificationService';
import imagesAdmin from '../../../assets/images/admin';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const HomePage = ({ onMenuClick }) => {
    const user = useSelector((state) => state.user);
    const [countProductCheck, setCountProductCheck] = useState()
    const [countUser, setCountUser] = useState()
    const [countCategory, setCountCategory] = useState()
    const [countNotify, setCountNotify] = useState()

    // lấy all sản phẩm chưa duyêt
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await ProductService.getAllProductCheck(user.access_token, "check");
            setCountProductCheck(res.data.length)
        } catch (err) {
            console.error("Lỗi khi lấy sản phẩm:", err);
        }
        };
        fetchData();
    }, [user.access_token])

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
    }, [user.access_token])

    // Gọi API kiểm tra có bao nhiêu loại sản phẩm
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await ProductService.getAllProduct(user.access_token);
                // Tạo danh sách category từ sản phẩm
                const uniqueCategories = new Set();
                res.data.forEach(p => {
                    if (p.category) {
                        uniqueCategories.add(p.category);
                    }
                });
                setCountCategory(uniqueCategories.size);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
        }
        };

        fetchProducts();
    }, [user.access_token]);

    // Gọi API lấy tất cả thông báo
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await NotificationService.getNotifications(user.id, user.access_token);
                setCountNotify(res.data.length)
            } catch (err) {
                console.error("Lỗi khi lấy thông báo:", err);
            }
        };
        fetchProducts();
  }, [user.access_token]);

    return (
        <div id="home" className={cx('dashboard')}>
            <div className={cx('box')} onClick={() => onMenuClick("categories")}>
                <img src={imagesAdmin.logo_list} alt="Số danh mục" />
                <span>Số danh mục</span>
                <span className={cx('count')}>{countCategory}</span>
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

            <div className={cx('box')} onClick={() => onMenuClick("notify")}>
                <img src={imagesAdmin.logo_infor} alt="Thông báo" />
                <span>Thông báo</span>
                <span className={cx('count')}>{countNotify}</span>
            </div>
        </div>
  );
};

export default HomePage;
