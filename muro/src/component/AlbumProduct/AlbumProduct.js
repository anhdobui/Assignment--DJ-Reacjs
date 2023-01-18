import classNames from 'classnames/bind';
import styles from './AlbumProduct.module.scss';
import Image from '@/component/Image';
const cx = classNames.bind(styles);
function AlbumProduct({data}) {
    return (<div className={cx('wrapper')}>
        <div className={cx('container')}>
            {data && data.length>0 && (
            <ul className={cx('list-img-album')}>
                {data.map((item)=>{
                    return (<li key={item.id} className={cx('thumb-ratio')} >
                        <Image
                                    src={item.album}
                                    className={cx('style-ratio')}
                                />
                    </li>)
                })}
            </ul>
            )}
            
        </div>
        
    </div>);
}

export default AlbumProduct;