import React, { useState } from "react";
import styled from "styled-components";

const ProductCard = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
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
  width: 100%;
  height: 60%;
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

const CardComponent = ({ IMG, NAME, PRICE, onClick }) => {
  return (
    <ProductCard onClick={onClick}>
      <ProductImage src={IMG} alt={NAME} />
      <ProductName>{NAME}</ProductName>
      <ProductPrice>{Number(PRICE).toLocaleString("vi-VN")} VNĐ</ProductPrice>
    </ProductCard>
  );
};

export default CardComponent;
