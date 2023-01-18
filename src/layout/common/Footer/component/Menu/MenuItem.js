import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function MenuItem({ item: { title, path } }) {
    return (
        <Link className={cx('menu-item')} to={path}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
            <span className={cx('title')}>{title}</span>
        </Link>
    );
}

export default MenuItem;
