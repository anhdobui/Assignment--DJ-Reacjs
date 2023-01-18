import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import config from '@/config';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ item: { title, pathCode } }) {
    return (
        <NavLink
            to={`${config.routes.product}${pathCode}`}
            className={cx('menu-item')}
        >
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
