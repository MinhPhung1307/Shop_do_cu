import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../components/CartItemComponent/CartItem.module.scss";
import CartItem from "../../components/CartItemComponent/CartItem";
import { useSelector } from "react-redux";
import * as ProductService from "../../services/ProductService";

const cx = classNames.bind(styles);

const CartPage = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user); // hoặc nơi bạn lưu user
  // Lấy danh sách id sản phẩm đã thích/giỏ hàng
  const [idProductLike, setIdProductLike] = useState([]);
  useEffect(() => {
    if (!user?.id) return;

    const fetchSeller = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/user/public/${user.id}`
        );
        const result = await res.json();
        console.log("Kết quả:", result);
        setIdProductLike(result.data._idProductlike || []);
      } catch (err) {
        console.error("Lỗi khi gọi API người bán:", err);
      }
    };

    fetchSeller();
  }, [user?.id]); // CHỈ theo dõi user.id

  // Lọc ra các sản phẩm có id nằm trong _idProductlike
  const cartItems = products.filter((item) => idProductLike.includes(item._id));

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Chỉ cập nhật nếu length khác nhau hoặc danh sách ID khác nhau
    const currentIDs = items
      .map((i) => i.ID)
      .sort()
      .join(",");
    const newIDs = cartItems
      .map((i) => i._id)
      .sort()
      .join(",");

    if (currentIDs !== newIDs) {
      setItems((prevItems) =>
        cartItems
          .filter((item) => item.status === "checked")
          .map((item) => {
            const old = prevItems.find((i) => i.ID === item._id);
            return {
              ID: item._id,
              IMG: item.images?.[0] || "",
              NAME: item.name,
              PRICE: item.price,
              SELECTED: old ? old.SELECTED : false,
            };
          })
      );
    }
  }, [cartItems]);

  const allSelected = items.length > 0 && items.every((i) => i.SELECTED);

  const handleSelectAll = (e) =>
    setItems(items.map((i) => ({ ...i, SELECTED: e.target.checked })));

  const handleSelect = (ID, checked) =>
    setItems(items.map((i) => (i.ID === ID ? { ...i, SELECTED: checked } : i)));

  const handleDeleteFromLike = async (productId) => {
    if (!user?.id || !user?.access_token) {
      alert("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/user/remove-like/${user.id}/${productId}`,
        {
          method: "DELETE",
          headers: {
            token: `Bearer ${user.access_token}`, // access_token sẽ được dùng để xác thực và lấy userId trên server
          },
        }
      );

      const result = await res.json();
      console.log("Kết quả xóa:", result);

      if (res.ok && result.status === "OK") {
        // Xóa ở FE
        setIdProductLike((prev) => prev.filter((id) => id !== productId));
        setItems((prev) => prev.filter((item) => item.ID !== productId));

        alert("Đã xóa sản phẩm khỏi danh sách.");
      } else {
        alert(result.message || "Xóa sản phẩm thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Đã xảy ra lỗi khi xóa sản phẩm.");
    }
  };

  //Xóa tất cả mục đã chọn
  const handleDeleteAll = async () => {
    const selected = items.filter((i) => i.SELECTED);

    if (selected.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào để xóa.");
      return;
    }

    try {
      for (const item of selected) {
        await fetch(
          `http://localhost:3001/api/user/remove-like/${user.id}/${item.ID}`,
          {
            method: "DELETE",
            headers: {
              token: `Bearer ${user.access_token}`,
            },
          }
        );
      }

      // Xóa ở FE
      const selectedIDs = selected.map((i) => i.ID);
      setIdProductLike((prev) =>
        prev.filter((id) => !selectedIDs.includes(id))
      );
      setItems((prev) => prev.filter((i) => !i.SELECTED));

      alert("Đã xóa các sản phẩm đã chọn.");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Đã xảy ra lỗi khi xóa sản phẩm.");
    }
  };

  //mua một sản phẩm
  const handleBuyOne = async (id) => {
    // Tìm sản phẩm trong danh sách items theo ID
    const item = items.find((i) => i.ID === id);
    console.log("id", id);
    console.log("item", item);
    if (!item) {
      alert("Không tìm thấy sản phẩm.");
      return;
    }

    try {
      const res = await ProductService.markAsSold(
        item.ID, // ID sản phẩm
        user.access_token,
        item.PRICE, // Giá sản phẩm
        user.id
      );

      if (res.status === "OK") {
        alert("Mua sản phẩm thành công!");
        // Xóa ở FE
        setIdProductLike((prev) => prev.filter((id) => id !== item.ID));
        setItems((prev) => prev.filter((item) => item.ID !== item.ID));
      } else {
        alert(res.message || "Mua sản phẩm thất bại.");
      }
    } catch (error) {
      console.error("Lỗi mua sản phẩm:", error);
      alert("Có lỗi xảy ra khi mua sản phẩm.");
    }
  };

  //Mua tất cả các mục đã chọn
  const handleBuyAll = async () => {
    const selectedItems = items.filter((i) => i.SELECTED);

    if (selectedItems.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào để mua.");
      return;
    }

    try {
      for (const item of selectedItems) {
        // 1. Gọi API mua hàng
        const res = await ProductService.markAsSold(
          item.ID, // ID sản phẩm
          user.access_token,
          item.PRICE,
          user.id
        );

        if (res.status !== "OK") {
          console.warn(`Mua sản phẩm ${item.NAME} thất bại.`);
          continue; // Bỏ qua nếu mua thất bại
        }

        // 2. Gọi API xóa sản phẩm khỏi danh sách yêu thích trên BE
        await fetch(
          `http://localhost:3001/api/user/remove-like/${user.id}/${item.ID}`,
          {
            method: "DELETE",
            headers: {
              token: `Bearer ${user.access_token}`,
            },
          }
        );
      }

      // 3. Xóa sản phẩm đã mua khỏi FE
      const selectedIDs = selectedItems.map((i) => i.ID);
      setIdProductLike((prev) =>
        prev.filter((id) => !selectedIDs.includes(id))
      );
      setItems((prev) => prev.filter((i) => !i.SELECTED));

      alert("Đã mua thành công tất cả sản phẩm đã chọn.");
    } catch (error) {
      console.error("Lỗi khi mua các sản phẩm đã chọn:", error);
      alert("Đã xảy ra lỗi khi mua sản phẩm.");
    }
  };

  //Tính tổng giá sản phẩm
  const selectedItems = items.filter((i) => i.SELECTED);
  const totalPrice = selectedItems.reduce((sum, i) => sum + i.PRICE, 0);

  return (
    <div className={cx("cart")}>
      {/* Thanh “Chọn tất cả” */}
      <div className={cx("selectAll")}>
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
          />
          Chọn tất cả
        </label>
      </div>

      {/* Danh sách sản phẩm */}
      <ul className={cx("list")}>
        {items.map((item) => (
          <CartItem
            key={item.ID}
            {...item}
            ON_SELECT={handleSelect}
            ON_DELETE={handleDeleteFromLike}
            ON_BUY={handleBuyOne}
          />
        ))}
      </ul>

      {items.some((i) => i.SELECTED) && (
        <div className={cx("actionBar")}>
          <span className={cx("actionBarInfo")}>
            Đã chọn {items.filter((i) => i.SELECTED).length} sản phẩm
          </span>

          {/* Summary */}
          <span className={cx("actionBarSummary")}>
            Tổng cộng ({selectedItems.length} sản phẩm):{" "}
            <span className={cx("actionBarTotal")}>
              {Number(totalPrice).toLocaleString("vi-VN")}
              VNĐ
            </span>
          </span>

          <div className={cx("actionBarButtons")}>
            <button className={cx("deleteAll")} onClick={handleDeleteAll}>
              Xóa
            </button>
            <button className={cx("buyAll")} onClick={handleBuyAll}>
              Mua hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
