import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import ProductItem from '@/component/ProductItem';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ListProduct({ className, label, data, slider = false , limit=10, noWrap=false}) {
    const [scrollX, setScrollX] = useState(0);
    const slideRef = useRef(null);
    const productRef = useRef(null);

    useEffect(() => {
        if(slideRef.current){slideRef.current.scrollLeft = scrollX;}
    }, [scrollX]);
    const handleBack = () => {
        if (slideRef.current.scrollLeft > 0) {
            setScrollX((prev) => prev - productRef.current.clientWidth);
        }
    };
    const handleNext = () => {
        const maxScrollLeft =
            slideRef.current.scrollWidth - slideRef.current.clientWidth;
        if (slideRef.current.scrollLeft < maxScrollLeft) {
            setScrollX((prev) => prev + productRef.current.clientWidth);
        }
    };
    
    return (
        <div className={cx('wrapper',className)}>
            <div className={cx('container')} >
                {label && <h4 className={cx('label')}>{label}</h4>}
                <div className={cx('list-product')}>
                    {data && data.some((cur) => cur != undefined ) && (
                        <div
                        ref={slideRef}
                        className={cx(noWrap ? 'wrap-list':'',slider ? 'panel-slider' : 'panel-grid')}
                    >
                        {data.map((item, index) => {
                                if(index < limit && item){
                                    return (
                                        <ProductItem
                                            ref={productRef}
                                            key={item.id}
                                            data={item}
                                        />
                                    );
                                }
                                else{
                                    return undefined
                                }
                            })}
                        </div>
                    )}
                    

                    {slider && (
                        <>
                            <button
                                className={cx('btn-back', 'btn-style')}
                                onClick={handleBack}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <button
                                className={cx('btn-next', 'btn-style')}
                                onClick={handleNext}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListProduct;
