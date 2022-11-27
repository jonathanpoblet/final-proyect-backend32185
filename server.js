import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js';
import routerApiCart from './routers/routerApiCart.js';
import routerApiSession from './routers/routerApiAdmin.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/session', routerApiSession);
app.use('/api/products',routerApiProducts);
app.use('/api/shoppingcart', routerApiCart);

app.listen(PORT, () => {
    console.log('Server listening on port 8080');
})