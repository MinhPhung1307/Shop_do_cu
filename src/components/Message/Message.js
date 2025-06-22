import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

const icons = {
    success: 'fa-solid fa-circle-check',
    info: 'fa-solid fa-circle-info',
    warning: 'fa-solid fa-circle-exclamation',
    error: 'fa-solid fa-circle-xmark'
};

const ToastMessage = ({ title = '', message = '', type = 'info', duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={cx('toast', `toast--${type}`)}>
            <div className={cx('toast__icon')}>
                <i className={icons[type]}></i>
            </div>
            <div className={cx('toast__body')}>
                <h3 className={cx('toast__title')}>{title}</h3>
                <p className={cx('toast__message')}>{message}</p>
            </div>
            <div className={cx('toast__close')} onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    );
};

export default ToastMessage;
