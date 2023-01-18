import classNames from "classnames/bind";
import styles from './ImageOrderSame.module.scss'
import  Image  from '@/component/Image';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function ImageOrderSame({limit=3,max_layout=4, className, data}) {
    return ( <div className={cx('wrapper',className)}>
        <div className={cx('container')}>
            <ol className={cx('list')}>
            {data && data.length > 0 && data.map(item => (
                <li key={item.path} style={{
                    flex:`0 0 ${100/max_layout}%`,
                    width:`${100/max_layout}%`
                }}>
                    <Link to={item.path}>
                        <div className="thumb-ratio">
                            <Image src={item.avatar} />
                        </div>
                    </Link>
                </li>
            ))}
            </ol>
        </div>
    </div> );
}

export default ImageOrderSame;