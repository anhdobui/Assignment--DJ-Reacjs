import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import Image from '@/component/Image';

const cx = classNames.bind(styles);

const ProductItem = forwardRef(({ data }, ref) => {
    const [sizeCurrent, setSizeCurrent] = useState(data.sizeCurrent);
    const handleActiveSize = (size) => {
        setSizeCurrent(size);
    };

    return (
        <div ref={ref} className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('panel-top')}>
                            <div className={cx('list_discount')}>
                                {data.discount && <span className={cx('discount')}>
                                    {data.discount}
                                </span>}
                                {data.saleLabel && <span className={cx('discount','sale_label')}>
                                    {data.saleLabel}
                                </span>}
                            </div>
                        <button className={cx('like')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    </div>
                    <div className={cx('panel-body')}>
                        <Link
                            className={cx('thumb-product')}
                            to={data.pathDetail}
                        >
                            <div className={cx('thumb-ratio')}>
                                <Image
                                    className={cx('img-face')}
                                    src={data.imageFace}
                                />
                                <Image
                                    className={cx('img-flip')}
                                    src={data.imageFlip}
                                />
                            </div>
                        </Link>
                        <div className={cx('same-product')}>
                            <div className={cx('list-color')}>
                                {data.otherColor &&
                                    data.otherColor.map((item, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                to={item.to}
                                                className={cx('flex-1-5')}
                                            >
                                                <div
                                                    className={cx(
                                                        'thumb-ratio',
                                                    )}
                                                >
                                                    <Image src={item.img} />
                                                </div>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className={cx('size-product')}>
                            <ul className={cx('list-size')}>
                                {data.listSize &&
                                    data.listSize.map((item, index) => {
                                        return (
                                            <li
                                                onClick={(e) => {
                                                    if (item.status) {
                                                        handleActiveSize(
                                                            item.size,
                                                        );
                                                    }
                                                }}
                                                key={index}
                                                className={cx({
                                                    'size-current':
                                                        sizeCurrent ===
                                                        item.size,
                                                    disable: !item.status,
                                                })}
                                            >
                                                {item.size}
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </div>
                    <div className={cx('panel-foot')}>
                        <div className={cx('info')}>
                            {data.name && (
                                <h2 className={cx('name')}>
                                    <span>{data.name}</span>
                                </h2>
                            )}
                            <div className={cx('price')}>
                                {data.priceNew && (
                                    <span
                                        className={cx('new-price', {
                                            sale: data.priceOld,
                                        })}
                                    >
                                        {data.priceNew}
                                    </span>
                                )}
                                {data.priceOld && (
                                    <span className={cx('old-price')}>
                                        {data.priceOld}
                                    </span>
                                )}
                            </div>
                            <Link
                                className={cx('btn-buy', {
                                    'btn-disable': !data.status,
                                })}
                                to={data.pathDetail}
                            >
                                <FontAwesomeIcon
                                    className={cx('icon-bag')}
                                    icon={faBagShopping}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProductItem;
