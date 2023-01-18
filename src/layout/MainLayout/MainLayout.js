import Header from '../common/Header';
import Footer from '../common/Footer';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
const cx = classNames.bind(styles);
function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
