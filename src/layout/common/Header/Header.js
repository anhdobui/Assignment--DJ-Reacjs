import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faBagShopping,
    faMagnifyingGlass,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '@/assets/images';
import Menu from './Menu';
import styles from './Header.module.scss';
import config from '@/config';
import ActionBtn from './ActionBtn';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home}>
                            <img src={images.logo} />
                        </Link>
                    </div>
                    <Menu />
                    <div className={cx('action')}>
                        <ActionBtn
                            className={cx('btn-search')}
                            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                        />
                        <ActionBtn
                            to="/"
                            className={cx('btn-search')}
                            icon={<FontAwesomeIcon icon={faUser} />}
                        />
                        <ActionBtn
                            className={cx('btn-search')}
                            icon={<FontAwesomeIcon icon={faBagShopping} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
