import React, { useState, useEffect, useMemo } from "react";
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
  max-width: 250px;
  width: 100%;
  flex-shrink: 1;
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    transform: translateY(-6px) scale(1.03);
    cursor: pointer;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    max-width: 45%;
  }

  /* Mobile */
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 120px;
  }
`;

const ProductName = styled.h3`
  font-size: 20px;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: normal;
  }
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: light;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CountdownText = styled.p`
  font-size: 20px;
  color: ${(props) => props.color || "black"};
  ${(props) =>
    props.color === "red" &&
    css`
      animation: ${bling} 1.5s infinite alternate ease-in-out;
    `}

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CardComponent = ({ product, onClick }) => {
  // Destructure các thuộc tính của sản phẩm để dễ dàng truy cập
  // Sử dụng optional chaining (?) để an toàn nếu 'product' ban đầu là null hoặc undefined
  const { images, name, price, createdAt, auctionEndTime } = product || {};

  // State để lưu trữ chuỗi thời gian còn lại (ví dụ: "01 : 23 : 45")
  const [timeLeft, setTimeLeft] = useState("");
  // State để lưu trữ màu của văn bản đếm ngược (đen, đỏ, xám)
  const [countdownColor, setCountdownColor] = useState("black");

  // useMemo để xác định thời gian kết thúc đấu giá "hiệu quả"
  // Ưu tiên sử dụng product.auctionEndTime nếu nó tồn tại và hợp lệ
  // Nếu không, sẽ tính toán từ product.createdAt + 48 giờ
  const effectiveAuctionEndTime = useMemo(() => {
    // 1. Ưu tiên product.auctionEndTime (thời gian đã được gia hạn từ backend)
    //    Kiểm tra xem nó có tồn tại và có phải là một đối tượng Date hợp lệ không.
    if (
      auctionEndTime &&
      new Date(auctionEndTime) instanceof Date &&
      !isNaN(new Date(auctionEndTime).getTime())
    ) {
      return new Date(auctionEndTime); // Trả về thời gian kết thúc đấu giá từ backend
    }
    // 2. Nếu product.auctionEndTime không có hoặc không hợp lệ, fallback về product.createdAt + 48 giờ
    //    Kiểm tra tương tự cho createdAt.
    if (
      createdAt &&
      new Date(createdAt) instanceof Date &&
      !isNaN(new Date(createdAt).getTime())
    ) {
      return new Date(new Date(createdAt).getTime() + 48 * 60 * 60 * 1000); // Tính toán thời gian kết thúc mặc định
    }
    return null; // Trả về null nếu không có nguồn thời gian hợp lệ nào
  }, [auctionEndTime, createdAt]); // Dependency array: useMemo sẽ chạy lại khi auctionEndTime hoặc createdAt thay đổi

  // useEffect để thiết lập và quản lý bộ đếm ngược
  useEffect(() => {
    // Nếu không có thời gian kết thúc hiệu quả (sản phẩm không có createdAt/auctionEndTime),
    // hiển thị 00:00:00 và màu xám, sau đó dừng.
    if (!effectiveAuctionEndTime) {
      setTimeLeft("00 : 00 : 00");
      setCountdownColor("gray");
      return; // Dừng thực thi phần còn lại của useEffect trong chu kỳ này
    }

    // Hàm nội bộ để tính toán thời gian còn lại
    const calculateTimeLeft = () => {
      // Tính sự khác biệt giữa thời gian kết thúc và thời gian hiện tại
      const difference =
        effectiveAuctionEndTime.getTime() - new Date().getTime();
      let calculatedTimeLeft = {};

      // Nếu còn thời gian (difference > 0), tính giờ, phút, giây
      if (difference > 0) {
        calculatedTimeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)), // Tổng số giờ còn lại
          minutes: Math.floor((difference / 1000 / 60) % 60), // Số phút còn lại trong giờ hiện tại
          seconds: Math.floor((difference / 1000) % 60), // Số giây còn lại trong phút hiện tại
        };
      }
      return calculatedTimeLeft;
    };

    // --- Thực hiện tính toán ban đầu khi component mount hoặc effectiveAuctionEndTime thay đổi ---
    // Điều này đảm bảo thời gian và màu được hiển thị ngay lập tức, không chờ 1 giây đầu tiên
    const initialTimeLeft = calculateTimeLeft();
    if (Object.keys(initialTimeLeft).length === 0) {
      // Nếu không còn thời gian, đặt về 00:00:00 và màu xám
      setTimeLeft("00 : 00 : 00");
      setCountdownColor("gray");
    } else {
      // Định dạng chuỗi thời gian (thêm '0' phía trước nếu là số đơn)
      const hours = String(initialTimeLeft.hours || 0).padStart(2, "0");
      const minutes = String(initialTimeLeft.minutes || 0).padStart(2, "0");
      const seconds = String(initialTimeLeft.seconds || 0).padStart(2, "0");

      // Cập nhật màu dựa trên số giờ còn lại
      if (initialTimeLeft.hours <= 1 && initialTimeLeft.hours >= 0) {
        setCountdownColor("red"); // Màu đỏ nếu còn <= 1 giờ
      } else {
        setCountdownColor("black"); // Màu đen nếu còn > 1 giờ
      }
      setTimeLeft(`${hours} : ${minutes} : ${seconds}`); // Cập nhật chuỗi thời gian
    }

    // --- Thiết lập Interval để cập nhật thời gian mỗi giây ---
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(); // Tính toán thời gian còn lại mới nhất
      if (Object.keys(newTimeLeft).length === 0) {
        // Nếu đã hết thời gian
        setTimeLeft("00 : 00 : 00"); // Hiển thị 00:00:00
        setCountdownColor("gray"); // Đặt màu xám
        clearInterval(timer); // Dừng bộ đếm ngược
      } else {
        // Nếu vẫn còn thời gian, định dạng và cập nhật hiển thị
        const hours = String(newTimeLeft.hours || 0).padStart(2, "0");
        const minutes = String(newTimeLeft.minutes || 0).padStart(2, "0");
        const seconds = String(newTimeLeft.seconds || 0).padStart(2, "0");

        // Cập nhật màu dựa trên số giờ còn lại
        // Chỉ gọi setCountdownColor nếu màu thực sự thay đổi để tránh re-render không cần thiết
        if (newTimeLeft.hours <= 1 && newTimeLeft.hours >= 0) {
          if (countdownColor !== "red") {
            setCountdownColor("red");
          }
        } else {
          if (countdownColor !== "black") {
            setCountdownColor("black");
          }
        }
        setTimeLeft(`${hours} : ${minutes} : ${seconds}`); // Cập nhật chuỗi thời gian
      }
    }, 1000); // Cập nhật mỗi 1000 mili giây (1 giây)

    // Hàm dọn dẹp (cleanup function): được chạy khi component unmount
    // hoặc khi các dependencies của useEffect thay đổi (trước khi useEffect chạy lại)
    return () => clearInterval(timer); // Xóa interval để tránh rò rỉ bộ nhớ
  }, [effectiveAuctionEndTime, countdownColor]); // Dependency array: useEffect này sẽ chạy lại khi effectiveAuctionEndTime hoặc countdownColor thay đổi.
  // effectiveAuctionEndTime thay đổi khi product.auctionEndTime thay đổi từ parent.

  // Chuẩn bị URL hình ảnh, an toàn hơn với optional chaining và kiểm tra mảng rỗng
  const productImageUrl =
    images && images.length > 0
      ? `https://shop-do-cu-be-ttkw.onrender.com/${images[0].replace(/\\/g, "/")}`
      : "";

  // Render UI của Product Card
  return (
    <ProductCard onClick={onClick}>
      <ProductImage src={productImageUrl} alt={name} />{" "}
      {/* Sử dụng name từ product */}
      <ProductName>{name}</ProductName> {/* Sử dụng name từ product */}
      <ProductPrice>
        {Number(price).toLocaleString("vi-VN")} VNĐ
      </ProductPrice>{" "}
      {/* Sử dụng price từ product */}
      <CountdownText color={countdownColor}>{timeLeft}</CountdownText>{" "}
      {/* Sử dụng state countdownColor và timeLeft */}
    </ProductCard>
  );
};

export default CardComponent;
