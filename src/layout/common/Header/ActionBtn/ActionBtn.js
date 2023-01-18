import classNames from 'classnames/bind';
import styles from './ActionBtn.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function ActionBtn({ className, icon, to, ...props }) {
    const Comp = to ? Link : 'button';
    return (
        <Comp to={to} className={cx('btn', className)} {...props}>
            {icon}
        </Comp>
    );
}

export default ActionBtn;
