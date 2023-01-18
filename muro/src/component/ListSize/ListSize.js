import classNames from "classnames/bind";
import styles from './ListSize.module.scss'
import { useState, useRef, useEffect } from 'react';
const cx = classNames.bind(styles)
function ListSize() {
    const liRef= useRef()
    const [currentSize,setCurrentSize] = useState()
    const handleClick = (e) =>{
        setCurrentSize(e.target)
    }
    useEffect(()=>{
        if(currentSize){
            currentSize.classList.add(cx('size-active'))
        }else{
            liRef.current.classList.add(cx('size-active'))
        }
        return () =>{
            if(currentSize){currentSize.classList.remove(cx('size-active'))}
            else{
                liRef.current && liRef.current.classList.remove(cx('size-active'))
            }
            // refLi.current && refLi.current.classList.remove(cx('size-active'))
        }
    },[currentSize])
    return ( <div className={cx('wrapper')}>
        <div className={cx('wrap-size')}>
            <label>Size</label>
            <ul className={cx('list-size')}>
                <li onClick={handleClick}>36</li>
                <li onClick={handleClick}>37</li>
                <li onClick={handleClick}>38</li>
                <li onClick={handleClick}>39</li>
                <li ref={liRef} onClick={handleClick}>40</li>
                <li onClick={handleClick}>41</li>
                <li onClick={handleClick}>42</li>
                <li onClick={handleClick}>43</li>
                <li onClick={handleClick}>44</li>
                <li onClick={handleClick}>45</li>
                <li onClick={handleClick}>46</li>
                <li onClick={handleClick}>47</li>
            </ul>
        </div>
    </div> );
}

export default ListSize;