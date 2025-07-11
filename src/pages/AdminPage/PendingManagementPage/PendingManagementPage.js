// src/components/AdminComponent/PendingProductManager/PendingProductManager.jsx
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../AdminPage.module.scss';
import * as ProductService from '../../../services/ProductService'
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const PendingManagementPage = ({setToast}) => {
    const user = useSelector((state) => state.user);
    const [productCheck, setProductCheck] = useState([])

    // lấy all sản phẩm chưa duyêt
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getAllProductCheck(user.access_token, "check");
                setProductCheck(res.data)
            } catch (err) {
                console.error("Lỗi khi lấy sản phẩm:", err);
            }
        };
        fetchData();
    }, [])

    const handleApprove = async (id) => {
        try {
            const res = await ProductService.updateState(id, user.access_token);
            if(res.status === "OK"){
                setToast("success", "Thành công", res.message);
            }
            // Cập nhật lại danh sách
            setProductCheck((prev) => prev.filter(product => product._id !== id));
        } catch (error) {
            console.error("Lỗi duyệt sản phẩm:", error);
            alert("Có lỗi xảy ra khi duyệt sản phẩm");
        }
    }

    const handleReject = async (id) => {
        try {
            const res = await ProductService.deleteProduct(id, user.access_token);
            if(res.status === "OK"){
                setToast("success", "Thành công", res.message);
            }
            // Cập nhật lại danh sách
            setProductCheck((prev) => prev.filter(product => product._id !== id));
        } catch (error) {
            console.error("Lỗi duyệt sản phẩm:", error);
            alert("Có lỗi xảy ra khi duyệt sản phẩm");
        }
    }
    return (
        <section id="pending" className={cx('content-section')}>
            <div className={cx('header-line')}>
                <h2>Danh sách sản phẩm chờ duyệt</h2>
                <input type="text" placeholder="Nhập tên sản phẩm" />
            </div>

            {productCheck?.length === 0 ? (
                <p>Không có sản phẩm nào chờ duyệt.</p>
            ) : (
                productCheck.map((product) => (
                    <div key={product._id} className={cx('product-item')}>
                        <img src={product.images?.[0] || '/image/default.png'} alt={product.name} />
                        <span className={cx('code')}>{product._id}</span>
                        <span className={cx('name')}>{product.name}</span>
                        <span className={cx('price')}>
                        {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        <div className={cx('group-btn')}>
                            <button className={cx('approve-btn')} onClick={() => handleApprove(product._id)}>✅</button>
                            <button className={cx('reject-btn')} onClick={() => handleReject(product._id)}>❌</button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
};

export default PendingManagementPage;
