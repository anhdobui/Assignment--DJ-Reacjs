import { useState } from "react";
import classNames from "classnames/bind";
import styles from './AddBasket.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBagShopping} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function AddBasket({className}) {
    const [counter, setCounter] = useState(1)
    const handleRaise = (e) => {
        setCounter(prev => prev+1)
    }
    const handleDecrease = (e) => {
        setCounter(prev => prev >= 1 ? (prev-1) : 0)
    }
    return ( <div className={cx('wrapper',className)}>
        <div className={cx('container')}>
            <div className={cx('product-quantity')}>
                <button className={cx('btn-control')} onClick={handleDecrease}>-</button>
                <input type="number" name="qty" value={counter} min="1" className={cx('input-qty')} onChange={(e)=>{
                    let value = e.target.value >= 0 ? e.target.value : 0
                   setCounter(value)
                }}/>
                <button className={cx('btn-control')} onClick={handleRaise}>+</button>
            </div>
            <div className={cx('add')}>
                <button className={cx('btn-add')}>
                    <FontAwesomeIcon className={cx('icon-bag')} icon={faBagShopping} />
                    <span>Add to basket</span>
                </button>
            </div>
        </div>
    </div> );
}

export default AddBasket;