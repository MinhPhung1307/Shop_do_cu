import React,{useState} from "react";
import styled from "styled-components";

const ProductCard = styled.div`
    width: 250px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    margin: 10px 0;
`;

const ProductImage = styled.img`
    width: 100%;
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
    color: #000;
`;

const CardComponent = () => {
    const [masp, setmasp] = useState('TL');
    return (
        <ProductCard>
            <ProductImage src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} alt={'abc'} />
            <ProductName>{'Giáo trình triết'}</ProductName>
            <ProductPrice>{'45.000'} đ</ProductPrice>
        </ProductCard>
    );
};

export default CardComponent;