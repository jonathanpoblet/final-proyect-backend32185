import express from 'express';

import { controllerGetProducts,
        controllerGetProductById,
        controllerPostProduct,
        controllerPutProductById,
        controllerDeleteProductById
} from '../controllers/controllersProducts.js';
import { soloParaAdmin } from '../controllers/controllerSession.js';

const routerApiProducts = express.Router();

//router products
routerApiProducts.get('/', controllerGetProducts);
routerApiProducts.get('/:id', controllerGetProductById);
routerApiProducts.post('/',controllerPostProduct);
routerApiProducts.put('/:id',controllerPutProductById);
routerApiProducts.delete('/:id',controllerDeleteProductById);

export default routerApiProducts;