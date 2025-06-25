import classNames from "classnames/bind";
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
function MenuItems({ data }) {
    return (
        <div className={cx('item')} onClick={data.callback}>
            <span className={cx('icon')}>{data.icon}</span>
            <span>{data.title}</span>
        </div>
    );
}

export default MenuItems;