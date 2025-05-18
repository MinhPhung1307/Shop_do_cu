import React from 'react';

import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HomePage = () => {
    return (
        <div className={cx('wrapper')}>
            HomePage
        </div>
    )

}

export default HomePage;