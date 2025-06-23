import React from "react";
import classNames from "classnames/bind";
import styles from "./ChatInfoComponent.module.scss";

const cx = classNames.bind(styles);

const ChatInfoComponent = ({ avatar, name }) => {
  return (
    <div className={cx("Chat-Info")}>
      <img src={avatar} alt={name} className={cx("Avatar")} />
      <div className={cx("Name")}>{name}</div>
    </div>
  );
};

export default ChatInfoComponent;
