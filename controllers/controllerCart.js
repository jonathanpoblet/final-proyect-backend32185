import { randomUUID } from 'crypto';

//Container Files
//import ContainerCart from '../class/containerCart.js';
//const containerCart = new ContainerCart('./files/cart.txt');

//Container Products for adding to cart
import { containerProducts } from './controllersProducts.js';

//Container Cart MongoDB
//import { collectionCartMongoDB } from '../config/config.js';
//import { ContainerCartMongoDB } from '../class/containerCartMongo.js';
//export const containerCart = new ContainerCartMongoDB(collectionCartMongoDB)

//Container Cart Firestore 
import { collectionCartFirestore } from '../config/config.js';
import { ContainerCartFierstore } from '../class/containerCartFirestore.js';
export const containerCart = new ContainerCartFierstore(collectionCartFirestore);

export async function controllerPostCart(req,res) {
    const body = req.body;
    if(!body.products){
        const newCart = {
            identificator: randomUUID(),
            products: []
        }
        await containerCart.createNewCart(newCart)
        res.json(newCart)
    }else{
        const newCart = {
            identificator: randomUUID(),
            products : body.products
        }
        await containerCart.createNewCart(newCart);
        res.json(newCart);
    }
}

export async function controllerDeleteCart({ params: {id_cart}},res){
    const cartFound = await containerCart.getCartById(id_cart);
    if(!cartFound){
        res.status(404);
        res.json({ error: `Cart with id ${id_cart} not found` });
    }else{
        await containerCart.deleteProductsCart(id_cart);
        const cartFound = await containerCart.getCartById(id_cart);
        res.json(cartFound);
    }
}


export async function controllerPostProductsToCart({body, params: {id_cart}},res){
    const productId = body.identificator
    const productFound = await containerProducts.getById(productId);
    if (productFound) {
        const cart = await containerCart.getCartById(id_cart);
        if (cart) {
            const newCart = await containerCart.updateById(id_cart,cart.products,productFound);
            res.json(newCart);
        } else {
            res.status(404);
            res.json({ error: `Cart with id ${id_cart} not found` });
        }
    } else {
        res.status(404);
        res.json({ error: `Product with id ${productId} not found` });
    }
}

export async function controllerGetProducts({params: {id_cart}},res){
    const cart = await containerCart.getCartById(id_cart);
    if (cart) {
        const productsOfCart = await containerCart.getProductsOfCart(id_cart);
        res.json(productsOfCart);
    } else {
        res.status(404);
        res.json({ error: `Cart with id ${id_cart} not found` });
    }
}

export async function controllerDeleteProduct({params: {id_cart , id_prod}},res){
    const idCart = id_cart;
    const idProduct = id_prod;
    const cartFound = await containerCart.getCartById(idCart);
    if(cartFound) {
        const productsOfCart = await containerCart.getProductsOfCart(idCart);
        const productFound = productsOfCart.find(product => product.identificator == id_prod);
        if(productFound) {
            await containerCart.deleteProductByIdCart(idCart,idProduct,productsOfCart);
            res.json(productFound);
        } else {
            res.status(404);
            res.json({ error : `Product with id ${idProduct} not found`});
        }
    } else {
        res.status(404);
        res.json({ error : `Cart with id ${idCart} not found`});
    }
}
