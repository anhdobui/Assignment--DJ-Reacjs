import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import { Link } from 'react-router-dom';
import Image from '@/component/Image';
const cx = classNames.bind(styles);

const dataFallback = [
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/AtomCustom_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/01_EN-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/02_EN-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/UltimasUnidades_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/04_EN-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/03_Slippers-EU-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/MateriaMod_EN-min.jpg',
        path: '/',
        arrange: 4,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/ParaElla_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/ParaEl_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
];
function Album({ data = dataFallback, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    {data.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={cx(
                                    `grid-${item.arrange}-4`,
                                    'widget',
                                )}
                            >
                                <Image
                                    sinkImg
                                    src={item.img}
                                    className={cx('thumb-ratio', 'style-ratio')}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Album;
