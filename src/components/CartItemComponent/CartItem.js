import React from "react";
import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";

const cx = classNames.bind(styles);

const CartItem = ({
  ID,
  IMG,
  NAME,
  PRICE,
  SELECTED,
  ON_SELECT,
  ON_DELETE,
  ON_BUY,
}) => (
  <li className={cx("item")}>
    <input
      type="checkbox"
      className={cx("checkbox")}
      checked={SELECTED}
      onChange={(e) => ON_SELECT(ID, e.target.checked)}
    />

    <img src={IMG} alt={NAME} className={cx("image")} />

    <div className={cx("info")}>
      <div className={cx("name")}>{NAME}</div>
      <div className={cx("price")}>
        <span>{Number(PRICE).toLocaleString("vi-VN")}</span> VNĐ
      </div>
    </div>

    <button className={cx("delete")} onClick={() => ON_DELETE(ID)}>
      Xóa
    </button>

    <button className={cx("btn-primary")} onClick={() => ON_BUY(ID)}>
      Mua Ngay
    </button>
  </li>
);

export default CartItem;
