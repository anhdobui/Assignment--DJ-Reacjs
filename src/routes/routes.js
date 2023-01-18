import Home from '@/pages/Home';
import ProductCat from '@/pages/ProductCat';
import ProductDetail from '@/pages/ProductDetail';
import config from '@/config';
const publicRoute = [
    { path: `${config.routes.product}:nameProductCat`, component: ProductCat },
    { path: `${config.routes.productDetail}`, component: ProductDetail },
    { path: config.routes.home, component: Home },
];
const privateRoute = [];
export { publicRoute, privateRoute };
