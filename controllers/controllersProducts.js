import { randomUUID } from "crypto";

//Container Files
//import ContainerProducts from "../class/containerProducts.js";
//export const containerProducts = new ContainerProducts('./files/products.txt');

//Container MongoDB
//import { collectionProductsMongoDB } from "../config/config.js";
//import { ContainerProductsMongoDB } from "../class/containerProductsMongo.js";
//export const containerProducts = new ContainerProductsMongoDB(collectionProductsMongoDB);

//Container Firestore
import { ContainerProductsFirestore } from "../class/containerProductsFirestore.js";
import { collectionProductsFirestore } from "../config/config.js";
export const containerProducts = new ContainerProductsFirestore(collectionProductsFirestore)

export async function controllerGetProducts(req,res) {
    const products = await containerProducts.getAll();
    res.json(products);
}

export async function controllerGetProductById( {params: { id }},res) {
    const productFound = await containerProducts.getById(id);
    if(productFound){ 
        res.json(productFound);
    }else {
        res.status(404);
        res.json({error: "product not found"});
    }
}

export async function controllerPostProduct(req,res) {
    const newProduct = req.body;
    newProduct.identificator = randomUUID();
    await containerProducts.save(newProduct);
    res.status(201);
    res.json(newProduct)
}

export async function controllerPutProductById({body, params: { id }}, res){
    const product = await containerProducts.getById(id);
    if (product) {
        await containerProducts.changeById(id,body);
        const product = await containerProducts.getById(id);
        res.json(product);
    } else {
        res.status(404);
        res.json({error: "product with id: " + id + " not found"});
    }

}

export async function controllerDeleteProductById({ params: { id }},res) {
    const product = await containerProducts.getById(id);
    if(product) {
        await containerProducts.deleteById(id);
        res.json(product);
    }
    else{
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
}




