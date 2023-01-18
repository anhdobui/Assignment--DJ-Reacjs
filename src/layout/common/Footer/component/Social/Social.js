import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
} from '@/component/Icon';
import classNames from 'classnames/bind';
import styles from './Social.module.scss';
const cx = classNames.bind(styles);
function Social({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('list-social')}>
                    <a href={data.href} className={cx('facebook')}>
                        <FacebookIcon />
                    </a>
                    <a href={data.href} className={cx('twitch')}>
                        <TwitterIcon />
                    </a>
                    <a href={data.href} className={cx('instagram')}>
                        <InstagramIcon />
                    </a>
                    <a href={data.href} className={cx('linkedin')}>
                        <LinkedinIcon />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Social;
