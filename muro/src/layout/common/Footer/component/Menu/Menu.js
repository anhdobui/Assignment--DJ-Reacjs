import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
const cx = classNames.bind(styles);
function Menu({ data }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('label')}>
                <span>{data.label}</span>
            </h4>
            <nav className={cx('nav')}>
                {data.children &&
                    data.children.map((item, index) => {
                        return <MenuItem key={index} item={item} />;
                    })}
            </nav>
        </div>
    );
}

export default Menu;
