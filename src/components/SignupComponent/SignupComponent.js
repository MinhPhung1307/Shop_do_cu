import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SignupComponent.module.scss';
import Loading from '../LoadingComponent/Loading';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import images from '../../assets/images'

const cx = classNames.bind(styles);

const RegisterComponent = ({ setShowRegister, setShowLogin, setToast, openLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const mutation = useMutationHook(data => UserService.SignUpUser(data));
    const { data, isPending, isSuccess, isError } = mutation;

    const handleSignup = () => {
        mutation.mutate({ name, email, password, confirmPassword, address, phone });
    };

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            setToast('success', 'Đăng ký Thành công', data?.message || 'Đăng ký thành công!');
            setShowRegister(false);
            setShowLogin(true);
        } else if (isError || data?.status === 'ERR') {
            setToast('error', 'Thất bại', data?.message || 'Đăng ký thất bại');
        }
    }, [isSuccess, isError, data]);

    return (
        <div className={cx('register-container')} onMouseDown={(e) => {if (e.target === e.currentTarget) setShowRegister(false);}}>
            <div className={cx('login')}>
                <div className={cx('login__header')}>
                    <span className={cx('login__heading')}>Đăng Ký</span>
                    <span className={cx('login__switchBtn')} onClick={openLogin}>Đăng nhập</span>
                </div>

                <img src={images.logo} alt="logo" />

                <div className={cx('form-group')}>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <label for="name">Họ và tên</label>
                </div>
               
                <div className={cx('form-group')}>
                    <input id="username" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <label for="username">Emai của bạn</label>
                </div>

                <div className={cx('form-group')}>
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <label for="password">Mật khẩu</label>
                    {
                        showPassword ?
                            (<div className={cx('icon-hide')} onClick={() => setShowPassword(!showPassword)}><i className="fa-solid fa-eye"></i></div>) :
                            (<div className={cx('icon-show')} onClick={() => setShowPassword(!showPassword)}><i className="fa-solid fa-eye-slash"></i></div>)
                    }
                </div>

                <div className={cx('form-group')}>
                    <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <label for="confirmPassword">Xác nhận mật khẩu</label>
                    {
                        showConfirmPassword ?
                            (<div className={cx('icon-hide')} onClick={() => setShowConfirmPassword(!showConfirmPassword)}><i className="fa-solid fa-eye"></i></div>) :
                            (<div className={cx('icon-show')} onClick={() => setShowConfirmPassword(!showConfirmPassword)}><i className="fa-solid fa-eye-slash"></i></div>)
                    }
                </div>
                <div className={cx('form-group')}>
                    <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                    <label for="address">Địa chỉ</label>
                </div>
                <div className={cx('form-group')}>
                    <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                    <label for="phone">Số điện thoại</label>
                </div>
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
