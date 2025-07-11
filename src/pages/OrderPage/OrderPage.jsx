import React, { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItemComponent/ProductItem";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./OrderPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const OrderPage = () => {
  const [products, setProducts] = useState([]);
  const [boughtProducts, setBoughtProducts] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/product/auction")
      .then((res) => {
        setProducts(res.data);
        console.log("API data:", res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Gọi API lấy đơn hàng đã mua
  useEffect(() => {
    if (!user.id) return;
    axios
      .get(`http://localhost:3001/api/product/bought-by-user/${user.id}`)
      .then((res) => {
        setBoughtProducts(res.data);
        console.log("API bought data:", res.data);
      })
      .catch((err) => console.error("Lỗi khi lấy đơn đã mua:", err));
  }, [user.id]);

  const handleCancelOrder = (productId) => {
    axios
      .put(`http://localhost:3001/api/product/cancel-bid/${productId}`, {
        userId: user.id, // dùng _id nếu backend lưu như vậy
      })
      .then(() => {
        // Cập nhật lại danh sách sản phẩm
        return axios.get("http://localhost:3001/api/product/auction");
      })
      .then((res) => setProducts(res.data))
      .catch(console.error);
  };

  // Lọc sản phẩm mà user đã đặt giá và lấy giá đã đặt
  const userProducts = products
    .map((item) => {
      const userBid = item.bids?.find(
        (bid) => String(bid.bidderId) === String(user.id)
      );
      if (userBid) {
        return { ...item, userBidPrice: userBid.amount };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className={cx("list__products")}>
      {userProducts.map((item) => (
        <ProductItem
          key={item._id}
          IMG={item.images?.[0]}
          NAME={item.name}
          PRICE={item.userBidPrice} // Giá user đã đặt
          STATUS={item.status}
          onCancel={() => handleCancelOrder(item._id)}
        />
      ))}
      {/* Danh sách đơn hàng đã mua */}
      {boughtProducts.map((item) => (
        <ProductItem
          key={item._id}
          IMG={item.images?.[0]}
          NAME={item.name}
          PRICE={item.price} // Giá đã mua
          STATUS={item.status} // status sẽ là "sold"
        />
      ))}
    </div>
  );
};

export default OrderPage;