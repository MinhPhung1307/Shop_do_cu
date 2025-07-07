import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const bling = keyframes`
  0% {
  transform: scale(1); /* Kích thước ban đầu */
          color: red; /* Giữ lại nếu bạn vẫn muốn nhấp nháy màu cùng lúc */
        }
        50% {
          transform: scale(1.05); /* Lớn hơn một chút (ví dụ 5%) */
          color: white; /* Giữ lại nếu bạn vẫn muốn nhấp nháy màu cùng lúc */
        }
        100% {
          transform: scale(1); /* Trở về kích thước ban đầu */
          color: red; /* Giữ lại nếu bạn vẫn muốn nhấp nháy màu cùng lúc */
        }
`;

const ProductCard = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 10px 0;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    transform: translateY(-6px) scale(1.03);
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const ProductName = styled.h3`
  font-size: 20px;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: light;
  color: var(--primary-color);
`;

const CountdownText = styled.p`
  font-size: 20px;
  color: ${(props) => props.color || "black"};
  // Áp dụng animation có điều kiện: chỉ khi màu là đỏ
  ${(props) =>
    props.color === "red" &&
    css`
      animation: ${bling} 1.5s infinite alternate ease-in-out;
    `}
`;

const CardComponent = ({ IMG, NAME, PRICE, productCreatedAt, onClick }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [countdownColor, setCountdownColor] = useState("black");
  useEffect(() => {
    // Đảm bảo productCreatedAt được cung cấp và là một ngày hợp lệ
    if (!productCreatedAt) {
      setTimeLeft("00 : 00 : 00");
      setCountdownColor("gray");
      return;
    }

    const creationDate = new Date(productCreatedAt);
    // Tính toán thời gian kết thúc: thời gian tạo + 48 giờ
    const countdownEndTime = new Date(
      creationDate.getTime() + 48 * 60 * 60 * 1000
    );

    const calculateTimeLeft = () => {
      const difference = countdownEndTime.getTime() - new Date().getTime();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)), // Tổng số giờ còn lại
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (Object.keys(newTimeLeft).length === 0) {
        setTimeLeft("00 : 00 : 00"); // Khi hết thời gian, hiển thị cố định 00:00:00
        setCountdownColor("gray");
        clearInterval(timer); // Dừng đếm ngược khi hết thời gian
      } else {
        // Định dạng hiển thị thời gian còn lại
        // Đảm bảo luôn chuyển đổi sang chuỗi và dùng padStart
        const hours = String(newTimeLeft.hours || 0).padStart(2, "0");
        const minutes = String(newTimeLeft.minutes || 0).padStart(2, "0");
        const seconds = String(newTimeLeft.seconds || 0).padStart(2, "0");

        if (newTimeLeft.hours <= 1) {
          setCountdownColor("red");
        } else {
          setCountdownColor("black");
        }
        setTimeLeft(`${hours} : ${minutes} : ${seconds}`);
      }
    }, 1000);

    // Hàm dọn dẹp: xóa interval khi component bị gỡ khỏi DOM
    return () => clearInterval(timer);
  }, [productCreatedAt]); // Dependency array: re-run useEffect nếu productCreatedAt thay đổi

  return (
    <ProductCard onClick={onClick}>
      <ProductImage src={IMG} alt={NAME} />
      <ProductName>{NAME}</ProductName>
      <ProductPrice>{Number(PRICE).toLocaleString("vi-VN")} VNĐ</ProductPrice>
      <CountdownText color={countdownColor}>{timeLeft}</CountdownText>
    </ProductCard>
  );
};

export default CardComponent;
