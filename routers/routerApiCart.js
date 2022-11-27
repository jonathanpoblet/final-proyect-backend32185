import express from 'express';

import { controllerPostCart,
         controllerDeleteCart,
         controllerPostProductsToCart,
         controllerGetProducts,
         controllerDeleteProduct 
} from '../controllers/controllerCart.js';

const routerApiCart = express.Router();

//router cart
routerApiCart.post('/', controllerPostCart);
routerApiCart.delete('/:id_cart', controllerDeleteCart);
routerApiCart.post('/:id_cart/products', controllerPostProductsToCart);
routerApiCart.get('/:id_cart/products', controllerGetProducts);
routerApiCart.delete('/:id_cart/products/:id_prod', controllerDeleteProduct);

export default routerApiCart;