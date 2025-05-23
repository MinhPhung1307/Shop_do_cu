import React, { useState } from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import ProductItem from '../../components/CardComponent/ProductItem';

const cx = classNames.bind(styles);

const HomePage = () => {
    const [Masp, setMasp] = useState(''); // Quản lý MaSP từ ProductItem

    // Hàm nhận giá trị từ ProductItem
    const [MaSP, setMaSP] = useState('DP');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_3.png" alt="Tai_lieu" />
                    <h2>Tài liệu</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='TL' && (<ProductItem />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_8.png" alt="Dung_cu" />
                    <h2>Dụng Cụ</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='DC' && (<ProductItem />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_29.png" alt="Noi_that" />
                    <h2>Nội Thất</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='NT' && (<ProductItem />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_42.png" alt="DO_dien_tu" />
                    <h2>Đồ Điện Tử</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='DDT' && (<ProductItem />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_56.png" alt="Dong_phuc" />
                    <h2>Đồng Phục</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='DP' && (<ProductItem />)}
                </div>
            </div>
        </div>
    );
};

export default HomePage;