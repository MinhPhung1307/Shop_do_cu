import React, { useState } from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import CardComponent  from '../../components/CardComponent/CardComponent.js';

const cx = classNames.bind(styles);

const HomePage = () => {
    const [Masp, setMasp] = useState(''); // Quản lý MaSP từ CardComponent 

    // Hàm nhận giá trị từ CardComponent 
    const [MaSP, setMaSP] = useState('DP');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_3.png" alt="Tai_lieu" />
                    <h2>Tài liệu</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='TL' && (<CardComponent />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_8.png" alt="Dung_cu" />
                    <h2>Dụng Cụ</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='DC' && (<CardComponent />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_29.png" alt="Noi_that" />
                    <h2>Nội Thất</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='NT' && (<CardComponent />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_42.png" alt="DO_dien_tu" />
                    <h2>Đồ Điện Tử</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='DDT' && (<CardComponent />)}
                </div>
            </div>
            <div className={cx('list__products')}>
                <div className={cx('title')}>
                    <img src="./image/image_56.png" alt="Dong_phuc" />
                    <h2>Đồng Phục</h2>
                </div>
                <div className={cx('list__products--item')}>
                    {MaSP==='DP' && (<CardComponent />)}
                </div>
            </div>
        </div>
    );
};

export default HomePage;