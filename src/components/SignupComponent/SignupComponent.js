import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SignupComponent.module.scss';
import Loading from '../LoadingComponent/Loading';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';

const cx = classNames.bind(styles);

const RegisterComponent = ({ setShowRegister, setShowLogin, setToast, openLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const mutation = useMutationHook(data => UserService.SignUpUser(data));
    const { data, isPending, isSuccess, isError } = mutation;

    const handleSignup = () => {
        mutation.mutate({ name, email, password, confirmPassword, address, phone });
    };

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            setToast('success', 'Thành công', 'Đăng ký thành công!');
            setShowRegister(false);
            setShowLogin(true);
        } else if (isError || data?.status === 'ERR') {
            setToast('error', 'Thất bại', data?.message || 'Đăng ký thất bại');
        }
    }, [isSuccess, isError, data]);

    return (
        <div className={cx('register-container')} onClick={(e) => {
            if (e.target === e.currentTarget) setShowRegister(false);
        }}>
            <div className={cx('login')}>
                <div className={cx('login__header')}>
                    <span className={cx('login__heading')}>Đăng Ký</span>
                    <span className={cx('login__switchBtn')} onClick={openLogin}>Đăng nhập</span>
                </div>

                <img src="/image/logo.png" alt="logo" />
                <input type="text" placeholder="Nhập Họ và tên" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Nhập Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Nhập lại Mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="text" placeholder="Nhập địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Nhập số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                <Loading isLoading={isPending}>
                    <button className={cx('login__submitBtn')} type="submit" onClick={handleSignup}>Đăng Ký</button>
                </Loading>
                <button className={cx('login__backBtn')} onClick={() => setShowRegister(false)}><span>Trở lại</span></button>
            </div>
        </div>
    );
};

export default RegisterComponent;
