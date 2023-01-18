import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SwitchBanner.module.scss';
import { Link } from 'react-router-dom';
import Image from '@/component/Image';
import images from '@/assets/images';
const cx = classNames.bind(styles);

const ListBanner = [
    {
        img: 'https://es.muroexe.com/modules/revsliderprestashop/uploads/NOOK-1920x784_Banner_Desktop_EN-min.jpg',
        to: '/',
    },
    {
        img: images.banner2,
        to: '/',
    },
    {
        img: images.banner1,
        to: '/',
    },
];
function SwitchBanner({ dataBanner = ListBanner }) {
    const [idActive, setIdActive] = useState(0);
    const [banner, setBanner] = useState(dataBanner[0]);

    const handleClick = (e, index) => {
        if (!e.target.classList.contains(styles.active)) {
            setIdActive(index);
            setBanner(dataBanner[index]);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('banners')}>
                    <Link className={cx('banner-item', 'thumb-ratio')}>
                        <Image
                            className={cx('image')}
                            sinkImg
                            src={banner.img}
                        />
                    </Link>
                    <div className={cx('list-dot')}>
                        <ul>
                            {dataBanner &&
                                dataBanner.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={cx('dot', {
                                                active: idActive === index,
                                            })}
                                            onClick={(e) =>
                                                handleClick(e, index)
                                            }
                                        ></li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SwitchBanner;
