import { useParams } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './ProductCat.module.scss';
import ListProduct from '@/component/ListProduct';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Breadcrumb from "@/component/Breadcrumb/Breadcrumb";
const cx = classNames.bind(styles);
const api_category = 'catalogue/api'
function Product() {
    const [listProduct, setListProduct]=useState([])
    const [dataCat, setDataCat]=useState({})
    const { nameProductCat } = useParams()
    const [currentId, setCurrentId] = useState()
    const refDescription = useRef()
    const refContent = useRef()
    useEffect(() => {
        setCurrentId(nameProductCat.split("-")[0])
    },[nameProductCat])
    useEffect(() => {
        if(currentId){
            axios.get(api_category +"/"+currentId)
            .then(res => res.data)
            .then(data => {
                setDataCat({
                    id:data.id,
                    content:data.content,
                    description:data.description,
                    title:data.title,
                })
                setListProduct(data.products.reduce((acc,cur) => {
                    let priceOld = cur.price && cur.price.slice(0,-1)
                    let priceSale = cur.price_sale && cur.price_sale.slice(0,-1)
                    let discount = (priceSale) ? -Math.round((((priceOld-priceSale)/priceOld)*100)*10)/10:undefined
                    return [
                        ...acc,
                        ...cur.children.map(item => {
                            return {
                                id:item.id,
                                imageFace: item.avatar,
                                imageFlip: item.avatar_flip,
                                otherColor: item.product_same.map((item_same) => {
                                    return {
                                            img: item_same.avatar,
                                            to: `/detail?id=${item_same.id}`,
                                    }
                                }),
                                pathDetail: `/detail?id=${item.id}`,
                                sizeCurrent: 39,
                                listSize: [
                                    {
                                        size: 36,
                                        path: '/',
                                        priceOld: '€99.60',
                                        priceNew: '€39.60',
                                        discount: '-10%',
                                        status: true,
                                    },
                                    {
                                        size: 37,
                                        path: '/',
                                        priceOld: '€929.60',
                                        priceNew: '€329.60',
                                        discount: '-20%',
                                        status: false,
                                    },
                                    {
                                        size: 38,
                                        path: '/',
                                        priceOld: '€929.60',
                                        priceNew: '€239.60',
                                        discount: '-30%',
                                        status: true,
                                    },
                                    {
                                        size: 39,
                                        path: '/',
                                        priceOld: '€929.60',
                                        priceNew: '€639.60',
                                        discount: '-40%',
                                        status: true,
                                    },
                                    {
                                        size: 40,
                                        path: '/',
                                        priceOld: '€929.60',
                                        priceNew: '€239.60',
                                        discount: '-50%',
                                        status: true,
                                    },
                                    {
                                        size: 41,
                                        path: '/',
                                        priceOld: '€991.60',
                                        priceNew: '€539.60',
                                        discount: '-60%',
                                        status: false,
                                    },
                                    {
                                        size: 42,
                                        path: '/',
                                        priceOld: '€299.60',
                                        priceNew: '€139.60',
                                        discount: '-70%',
                                        status: false,
                                    },
                                    {
                                        size: 43,
                                        path: '/',
                                        priceOld: '€499.60',
                                        priceNew: '€139.60',
                                        discount: '-80%',
                                        status: false,
                                    },
                                    {
                                        size: 44,
                                        path: '/',
                                        priceOld: '€599.60',
                                        priceNew: '€539.60',
                                        discount: '-90%',
                                        status: false,
                                    },
                                    {
                                        size: 45,
                                        path: '/',
                                        priceOld: '€699.60',
                                        priceNew: '€439.60',
                                        discount: '-100%',
                                        status: false,
                                    },
                                    {
                                        size: 46,
                                        path: '/',
                                        priceOld: '€299.60',
                                        priceNew: '€139.60',
                                        discount: '-110%',
                                        status: false,
                                    },
                                    {
                                        size: 47,
                                        path: '/',
                                        priceOld: '€919.60',
                                        priceNew: '€319.60',
                                        discount: '-120%',
                                        status: false,
                                    },
                                ],
                                name: cur.name,
                                priceOld: cur.price ,
                                priceNew: cur.price_sale,
                                discount: discount && `${discount}%`,
                                saleLabel: cur.label,
                                status: item?.stock != 0,
                            }
                        })
                    ]
                    
                    
                },[]))
            })
        } 
        
            // ------------------
        
    },[currentId])
    useEffect(()=>{
        refDescription.current.innerHTML = dataCat.description || ''
        refContent.current.innerHTML = dataCat.content || ''
    })
    return ( 
        <div className={cx('wrapper')}>
            <Breadcrumb local={dataCat.title}/>
            <div className={cx('container')}>
                <h1 className={cx('title')}>{dataCat.title}</h1>
                <div ref={refDescription} className={cx('description','data-edit')}></div>
                {listProduct.length > 0  && <ListProduct data={listProduct} limit="100" noWrap/>}
                <div className={cx('content','data-edit')} ref={refContent}></div>
            </div>
        </div> 
    );
}

export default Product;