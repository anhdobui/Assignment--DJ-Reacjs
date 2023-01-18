import { useState,useRef,useEffect } from "react";
import classNames from "classnames/bind";
import styles from './DetailDrop.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import DropTable from "@/component/DropTable";
const cx = classNames.bind(styles)
function DetailDrop({className,label="Description",data,meta="description"}) {
    const [isDrop, setIsDrop] = useState(false)
    const refDes = useRef()
    useEffect(() => {
        if(refDes.current && data){
            refDes.current.innerHTML = data
        } 
    },[isDrop])
    const handleClick = (e) => {
        setIsDrop(prev => !prev)
    }
    return ( <div className={cx('wrapper',className)}>
        <div className={cx('container')}>
            <h3 className={cx('title')}>
                <button onClick={handleClick}>
                    {label}
                    <FontAwesomeIcon className={cx('icon','icon-dow',isDrop ? 'isDrop':'')} icon={faAngleDown} />
                    <FontAwesomeIcon className={cx('icon')} icon={faAngleUp} />
                </button>
            </h3>
            <div className={cx('content',isDrop ? '':'hidden')}>
                {meta && meta=="description" && <div ref={refDes} className={cx('description')}></div>}
                {meta && meta=="table" && <DropTable data={data}/>}
            </div>
        </div>
    </div> );
}

export default DetailDrop;