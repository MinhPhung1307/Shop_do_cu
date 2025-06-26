import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import PopperWrapper from "../../Popper/Wrapper";
import MenuItems from "./MenuItems";

const cx = classNames.bind(styles);

function Menu({ children, items = [], offset = [8, 4] }) {

    const renderItem = () => {
        return items.map((item, index) => (
            <MenuItems key={index} data={item}/>
        ))
    }

    return (  
        <Tippy
            trigger="click"
            interactive
            offset={offset}
            placement="bottom-end"
            render = {attrs => (
                <div className={cx("menu-items")} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    {renderItem()}
                </PopperWrapper>
                </div>
            )}
            >
            {children}
        </Tippy>
    );
}

export default Menu;
