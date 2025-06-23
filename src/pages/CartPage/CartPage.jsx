import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../components/CartItemComponent/CartItem.module.scss";
import CartItem from "../../components/CartItemComponent/CartItem";

const cx = classNames.bind(styles);

const CartPage = () => {
  const [items, setItems] = useState([
    {
      ID: 1,
      IMG: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      NAME: "Máy tính Casio FX-580VN X",
      PRICE: 300000,
      SELECTED: false,
    },
    {
      ID: 2,
      IMG: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      NAME: "Máy tính ",
      PRICE: 330000,
      SELECTED: false,
    },
    {
      ID: 3,
      IMG: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      NAME: "Bàn phím cơ Dareu EK75 White Black PBT Multi Led",
      PRICE: 350000,
      SELECTED: false,
    },
  ]);

  const allSelected = items.length > 0 && items.every((i) => i.SELECTED);

  const handleSelectAll = (e) =>
    setItems(items.map((i) => ({ ...i, SELECTED: e.target.checked })));

  const handleSelect = (ID, checked) =>
    setItems(items.map((i) => (i.ID === ID ? { ...i, SELECTED: checked } : i)));

  const handleDelete = (ID) => setItems(items.filter((i) => i.ID !== ID));

  //Xóa tất cả mục đã chọn
  const handleDeleteAll = () => {
    setItems(items.filter((i) => !i.SELECTED));
  };

  //Mua tất cả các mục đã chọn
  const handleBuyAll = () => {
    setItems(items.filter((i) => !i.SELECTED));
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
            ON_DELETE={handleDelete}
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
              {totalPrice.toLocaleString()}₫
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
