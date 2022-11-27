import { randomUUID } from 'crypto';

import ContainerCart from '../class/containerCart.js';

const containerCart = new ContainerCart('./files/cart.txt');

//Cart controllers

export async function controllerPostCart(req,res) {
    const body = req.body;
    if(!body.products){
        const newCart = {
            id: randomUUID(),
            products: []
        }
        await containerCart.createNewCart(newCart)
        res.json(newCart)
    }else{
        const newCart = {
            id: randomUUID(),
            products : body.products
        }
        await containerCart.createNewCart(newCart);
        res.json(newCart);
    }
}

export async function controllerDeleteCart({ params: {id_cart}},res){
    await containerCart.deleteProductsCart(id_cart);
    const cartFound = await containerCart.getById(id_cart);
    if(!cartFound){
        res.status(404);
        res.json({ error: `Cart with id ${id_cart} not found` });
    }else{
        res.json(cartFound);
    }
}

export async function controllerPostProductsToCart({body, params: {id_cart}},res){
    const productAdd = await containerCart.addProductsToCart(id_cart,body);
    res.json(productAdd);
}

export async function controllerGetProducts({params: {id_cart}},res){
    const productsOfCart = await containerCart.getProductsOfCart(id_cart);
    res.json(productsOfCart);
}

export async function controllerDeleteProduct({params: {id_cart , id_prod}},res){
    const idCart = id_cart;
    const idProduct = id_prod;
    const cartFound = await containerCart.getById(idCart);
    if(cartFound) {
        const productsOfCart = await containerCart.getProductsOfCart(idCart);
        const productFound = productsOfCart.find(product => product.id == id_prod);
        if(productFound) {
            const productDelete = await containerCart.deleteProductByIdCart(idCart,idProduct);
            res.json(productDelete);
        } else {
            res.status(404);
            res.json({ error : `Product with id ${idProduct} not found`});
        }
    } else {
        res.status(404);
        res.json({ error : `Cart with id ${idCart} not found`});
    }
}
