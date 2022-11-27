import { randomUUID } from "crypto";

import ContainerProducts from "../class/containerProducts.js";

const containerProducts = new ContainerProducts('./files/products.txt');

//Products Controllers
export async function controllerGetProducts(req,res) {
    const products = await containerProducts.getAllProducts();
    res.json(products);
}

export async function controllerGetProductById( {params: { id }},res) {
    const productFound = await containerProducts.getById(id);
    if(productFound){ 
        res.json(productFound);
    }else {
        res.json({error: "product not found"});
    }
}

export async function controllerPostProduct(req,res) {
    const newProduct = req.body;
    newProduct.id = randomUUID();
    await containerProducts.save(newProduct);
    res.status(201);
    res.json(newProduct)
}

export async function controllerPutProductById({body, params: { id }}, res){
    const product = await containerProducts.getById(id);
    const newProduct = await containerProducts.changeById(id,body,product);
    if(!product) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
    else{
        res.json(newProduct);
    }

}

export async function controllerDeleteProductById({ params: { id }},res) {
    const product = await containerProducts.getById(id);
    if(product) {
        await containerProducts.deleteById(id);
        res.json(product);
    }
    else{
        res.json({ error: `Product with id ${id} not found`});
    }
}



