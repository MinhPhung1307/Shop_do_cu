import react from "react";
import styles from "./ChatPage.module.scss";
import classNames from "classnames/bind";
import ChatInfoComponent from "../../components/ChatInfoComponent/ChatInfoComponent";

const cx = classNames.bind(styles);

const ChatPage = () => {
  return (
    <ChatInfoComponent
      avatar="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      name="Nguyễn Văn A"
    />
  );
};

export default ChatPage;
