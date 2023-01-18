import classNames from 'classnames/bind';
import styles from './AboutUs.module.scss';
import Video from '@/component/Video';
const cx = classNames.bind(styles);
function AboutUs() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Video />
                <div className={cx('content')}>
                    <div className={cx('inner-content')}>
                        <h2 className={cx('label')}>About Us</h2>
                        <div className={cx('text')}>
                            <p>
                                We create technical and minimalist products for
                                everyday life. All our products are vegan and
                                with a strong sustainable component.{' '}
                            </p>
                            <p>
                                Also, we involve our user in all creative
                                processes to create the perfect product,
                                designed by and for them.{' '}
                            </p>
                            <p>
                                We are design. We are comfort. We are
                                commitment.{' '}
                            </p>
                            <p>We are #DOTHEFUTURE </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
