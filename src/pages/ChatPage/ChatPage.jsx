import react from "react";
import styles from "./ChatPage.module.scss";
import classNames from "classnames/bind";
import ChatInfoComponent from "../../components/ChatInfoComponent/ChatInfoComponent";
import Search from "../../components/SearchComponent/SearchComponent";

const cx = classNames.bind(styles);

const ChatPage = () => {
  return (
    <div className={cx("Container")}>
      <div className={cx("Header")}>
        <img
          src="./image/logo.png"
          alt="UTH University of Transport Ho Chi Minh City logo with large stylized UTH letters on the left and red text University of Transport Ho Chi Minh City on the right, set against a colorful background"
          className={cx("logo")}
        />
      </div>
      <div className={cx("Chat__content")}>
        <div className={cx("Chat__list")}>
          <div className={cx("Chat__search")}>
            <Search></Search>
          </div>
          <div className={cx("List__profile")}>
            <div className={cx("List__profile--items")}>
              <ChatInfoComponent
                avatar="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                name="Nguyễn Văn A"
              />
            </div>
          </div>
        </div>
        <div className={cx("Chat__table")}>
          <div className={cx("Chat__table--header")}>
            <ChatInfoComponent
              avatar="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              name="Nguyễn Văn A"
            />
            <div className={cx("Chat__table--header-icon")}>
              <div className={cx("Chat__table--icon-video")}>
                <i className="fa-solid fa-video"></i>
              </div>
              <div className={cx("Chat__table--icon-phone")}>
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className={cx("Chat__table--icon-more")}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>
          <div className={cx("Chat__table--content")}></div>
          <div>
            <form action="" className={cx("Chat__table--footer")}>
              <input type="text" placeholder="Nhập nội dung tin nhắn" />
              <div className={cx("Chat__table--footer-active")}>
                <div className={cx("Chat__table--icon-image")}>
                  <i className="fa-solid fa-image"></i>
                </div>
                <div className={cx("Chat__table--icon-smile")}>
                  <i className="fa-solid fa-face-smile"></i>
                </div>
                <button type="submit">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
