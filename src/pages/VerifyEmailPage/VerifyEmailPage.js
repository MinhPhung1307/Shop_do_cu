import React, { useEffect, useState } from "react";
import styles from "./VerifyEmailPage.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../../services/UserService'

const cx = classNames.bind(styles);

const VerifyEmailPage = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {

       const handleVerify = async () => {
            const res = await verifyEmail(token); 
            setTitle(res.data.title);
            setMessage(res.data.message);
            setType(res.data.status);
        };

        handleVerify();

        createConfetti();

        const style = document.createElement("style");
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        const container = document.querySelector(`.${cx("container")}`);
        if (container) {
            container.addEventListener("mouseenter", () => {
                container.style.transform = "scale(1.02)";
            });
            container.addEventListener("mouseleave", () => {
                container.style.transform = "scale(1)";
            });
        }

        return () => {
            document.head.removeChild(style);
        };
    }, [token, navigate]);

    const createConfetti = () => {
        const colors = ["#667eea", "#764ba2", "#4CAF50", "#45a049", "#fff"];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement("div");
                confetti.style.position = "fixed";
                confetti.style.left = Math.random() * 100 + "%";
                confetti.style.top = "-10px";
                confetti.style.width = "10px";
                confetti.style.height = "10px";
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = "50%";
                confetti.style.pointerEvents = "none";
                confetti.style.zIndex = "1000";
                confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;

                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 100);
        }
    };

    const goToLogin = () => {
        navigate("/");

    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("floating-particles")}>
                {[...Array(9)].map((_, idx) => (
                    <div key={idx} className={cx("particle")}></div>
                ))}
            </div>

            <div className={cx("container")}>
                { (type === 'OK') ? (
                    <div className={cx("success-icon")}>
                        <svg className={cx("checkmark")} viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4" />
                        </svg>
                    </div>
                ) : (   
                   <div className={cx("error-icon")}>
                        <svg className={cx("cross-mark")} viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                )}

                <h1 style={{ background: (type !== 'OK') ? 'linear-gradient(45deg, #ff4757, #ee5a24) text'
                        : 'linear-gradient(45deg, #667eea, #764ba2) text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text' 
                    }}>{title}</h1>
                <p className={cx("subtitle")}>{message}</p>

                {  (type === 'OK') ? 
                    (<div className={cx("success-message")}>
                        🎉 Chào mừng bạn đến với Shop của chúng tôi!
                    </div>)
                    :(<div className={cx("reasons")}>
                        <h3>🔍 Các nguyên nhân có thể:</h3>
                        <ul>
                            <li>Link xác thực đã hết hạn (thường sau 24 giờ)</li>
                            <li>Link đã được sử dụng trước đó</li>
                            <li>Email chứa link bị lỗi hoặc không đầy đủ</li>
                            <li>Tài khoản đã được xác thực trước đó</li>
                            <li>Có lỗi kỹ thuật tạm thời</li>
                        </ul>
                    </div>)
                }

                <div className={cx("action-buttons")}>
                    <button className={cx("btn", "btn-primary")} onClick={goToLogin}>
                        {type === 'OK' ? ('🏠 Đăng nhập ngay') : ('Trở về')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
