import classNames from "classnames/bind";
import styles from './InfoProduct.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import ImageOrderSame from "@/component/ImageOrderSame";
import AddBasket from "@/component/AddBasket";
import ListSize from '@/component/ListSize';
import DetailDrop from "@/component/DetailDrop";
const cx =  classNames.bind(styles)
function InfoProduct({data}) {
    return ( <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('panel-header','panel')}>
                        <h1 className={cx('title')}>
                            {data.title && <span>{data.title}</span>}
                            <button className={cx('btn-like')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </h1>
                        {data.name && <h2 className={cx('name')}>{data.name}</h2>}
                        <div className={cx('product-reference')}>
                            <label>Reference </label>
                            <span>{data.reference}</span>
                        </div>
                        <div className={cx('price')}>
                            {data.priceApply && <span className={cx('price-apply')}>{data.priceApply}</span>}
                            <span className={cx('tax-shipping')}>VAT included</span>
                            <span className={cx('product-discount')}>
                            {data.priceRegular && <span className={cx('regular-price')}>{data.priceRegular}</span>}
                            {data.discount && <span className={cx('discount-percentage')}>{data.discount}</span>}
                            </span>
                        </div>
                    </div>
                    <div className={cx('panel-body','panel')}>
                        {data.description_short && <div className={cx('product-description')}>{data.description_short}</div>}
                        <div className={cx('same-product')}>
                            <ImageOrderSame limit="3" data={data.product_same}/>
                        </div>
                        <ListSize />
                        <AddBasket className={cx('add-basket')} />
                    </div>
                    <div className={cx('panel-footer','panel')}>
                        <DetailDrop label="Description" data={data.description_detail}/>
                        <DetailDrop label="Product Details" meta="table" data={data.product_detail}/>
                        <DetailDrop label="Reviews (0)"/>
                        <DetailDrop label="Cleaning" data={data.cleaning}/>
                    </div>
                </div>
            </div> );
}

export default InfoProduct;