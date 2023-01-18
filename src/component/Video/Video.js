import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import videos from '@/assets/video';
const cx = classNames.bind(styles);
function Video({
    className,
    autoPlay = true,
    muted = true,
    loop = true,
    src = videos.aboutUs,
    type = 'mp4',
}) {
    return (
        <div className={cx('wrapper', className)}>
            <video autoPlay={autoPlay} muted={muted} loop={loop}>
                <source src={src} type={`video/${type}`} />
            </video>
        </div>
    );
}

export default Video;
