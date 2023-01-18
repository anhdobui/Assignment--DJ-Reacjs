import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { useEffect,useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);
const api = 'catalogue/api'

function Menu() {
    const [menu, setMenu] = useState([])
    useEffect(()=>{
        axios.get(api)
            .then(res => res.data.results)
            .then(data => {
                setMenu(data.map((item)=>{
                    return {
                        title:item.title,
                        pathCode:`/${item.id}-${item.title}`,
                        id:item.id
                    }
                }))
            })
            
    },[])
    return (
        <nav className={cx('nav')}>
            {menu.map((item) => {
                return <MenuItem key={item.id} item={item} />;
            })}
        </nav>
    );
}

export default Menu;
