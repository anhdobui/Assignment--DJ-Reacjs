import { useParams } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import ListProduct from '@/component/ListProduct';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Breadcrumb from "@/component/Breadcrumb/Breadcrumb";
import {useQuery} from '@/Hook'
import config from "@/config";
import InfoProduct from "@/component/InfoProduct";
import AlbumProduct from "@/component/AlbumProduct";
const cx = classNames.bind(styles)
const api_detail = 'product/api'
function ProductDetail() {
    let query = useQuery();
    const [id,setId] = useState()
    const [mes,setMess] = useState('Loading ...')
    const [dataProduct,setDataProduct] = useState({})
    useEffect(()=>{
        setId(query.get('id')*1 || undefined)
    },[query.get('id')])
    useEffect(()=>{
        if(id){
            axios.get(`${api_detail}/${id}`)
            .then(res => res.data)
            .then(data => {
                let price = data.price && data.price.replace('€','')
                let priceSale = data.price_sale && data.price_sale.replace('€','')
                let discount = priceSale && priceSale > 0 ? -Math.round((price-priceSale)*100/price * 10)/10:undefined
                setDataProduct({
                            title:data.name,
                            name:`${data.title_cate} ${data.name}`,
                            direct:[
                                {
                                    name:data.title_cate || '',
                                    path:`${config.routes.product}/${data.id_cate}`
                                }
                            ],
                            reference:data.reference,
                            priceApply:data.price_sale ? data.price_sale:data.price,
                            priceRegular:data.price_sale ? data.price:undefined,
                            discount:discount && `${discount}%`,
                            description_short:data.description_short,
                            description_detail:data.description_detail,
                            cleaning:data.cleaning,
                            product_detail:[
                                {
                                    key:'Colour',
                                    values:data.color
                                },
                                {
                                    key:'Style',
                                    values:data.style
                                },
                                {
                                    key:'Specs',
                                    values:data.specs
                                },
                                {
                                    key:'Material',
                                    values:data.material
                                },
                                {
                                    key:'ean13',
                                    values:data.ean13
                                },
                            ],
                            product_same:data.product_same.map(item_same => ({
                                avatar:item_same.avatar,
                                path:`/detail?id=${item_same.id}`,
                            })),
                            album:data.album
                        })
                  
            })
            .catch((e) => {
                setMess('Đã có lỗi xảy ra, không tìm thấy dữ liệu phù hợp')
            })
            setMess('')
        }
        else{
            setMess('Không có dữ liệu phù hợp')
        }
    },[id])
    return ( <div className={cx('wrapper')}>
        {Object.keys(dataProduct).length > 0 && (
            <>
                <Breadcrumb dataDirect={dataProduct.direct} local={dataProduct.title}/>
                <div className={cx('container')}>
                    <div className={cx('layout-grid')}>
                        <AlbumProduct data={dataProduct.album}/>
                        {dataProduct && <InfoProduct data={dataProduct} />}
                    </div>
                </div>
            </>
        ) || (<span>{mes}</span>) }
    </div> );
}

export default ProductDetail;