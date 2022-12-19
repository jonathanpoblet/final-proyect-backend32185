import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js';
import routerApiCart from './routers/routerApiCart.js';
import routerApiSession from './routers/routerApiAdmin.js';
import routerApiRouteNotFound from './routers/routerApiRouteNotFound.js';
import { PORT } from './config/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/session', routerApiSession);
app.use('/api/products',routerApiProducts);
app.use('/api/shoppingcart', routerApiCart);
app.use('*', routerApiRouteNotFound);

app.listen(PORT, () => {
    console.log('Server listening on port 8080');
})