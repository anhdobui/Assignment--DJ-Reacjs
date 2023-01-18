import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SwitchBanner from '@/component/SwitchBanner';
import Album from '@/component/Album';
import ListProduct from '@/component/ListProduct';
import Video from '@/component/Video';
import AboutUs from '@/component/AboutUs';
import videos from '@/assets/video';
import { useEffect, useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);
const api = 'product/api'


const album = [
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/AtomCustom_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/UltimasUnidades_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/01_EN-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/02_EN-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/04_EN-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/03_Slippers-EU-min.jpg',
        path: '/',
        arrange: 1,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/MateriaMod_EN-min.jpg',
        path: '/',
        arrange: 4,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/ParaElla_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
    {
        img: 'https://eu.muroexe.com/img/cms/HOME%20EN/ParaEl_EN-min.jpg',
        path: '/',
        arrange: 2,
    },
];
function Home() {
    const [dataProducts, setDataProducts] = useState([])
    useEffect(()=>{
        axios.get(api)
            .then(res => res.data.results)
            .then(data => {
                console.log(data)
                setDataProducts(data.map(item=>{
                    let priceOld = item.price && item.price.slice(0,-1)
                    let priceSale = item.price_sale && item.price_sale.slice(0,-1)
                    let discount = (priceSale) ? -Math.round((((priceOld-priceSale)/priceOld)*100)*10)/10:undefined
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
                        name: item.name,
                        priceOld: item.price ,
                        priceNew: item.price_sale,
                        discount: discount && `${discount}%`,
                        saleLabel: item.label,
                        status: item?.stock != 0,
                    } 
                }))
            })
            
    },[])
    return (
        <div className={cx('home-page')}>
            <div className={cx('container')}>
                <Video className={cx('video-intro')} src={videos.intro} />
                <SwitchBanner />
                
                <Album data={album} />
                <ListProduct className={cx('new_product')} container slider label="Featured Products" data={dataProducts} limit="10"/>
                <AboutUs />
            </div>
        </div>
    );
}

export default Home;
