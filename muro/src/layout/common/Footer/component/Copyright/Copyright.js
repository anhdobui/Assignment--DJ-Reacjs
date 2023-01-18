import classNames from 'classnames/bind';
import styles from './Copyright.module.scss';
import images from '@/assets/images';
const cx = classNames.bind(styles);
function Copyright({}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <img src={images.logoPeta} />
                </div>
                <div></div>
                <div className={cx('text')}>
                    <p>Muroexe APP</p>
                    <p>Discover exclusive benefits by downloading the APP</p>
                </div>
                <div className={cx('app')}>
                    <a className={cx('btn-app')}>
                        <img src={images.downAdr} />
                    </a>
                    <a className={cx('btn-app')}>
                        <img src={images.downIos} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Copyright;
