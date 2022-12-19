import { mongoDatabase } from "../clients/mongoClient.js";

export class ContainerCartMongoDB {
    constructor(collection) {
        this.collection = mongoDatabase.collection(collection);
    }

    async createNewCart(cart) {
        try {
            await this.collection.insertOne(cart);
        } catch (error) {
            throw new Error("No cart save " + error);
        }
    }

    async deleteProductsCart(id) {
        try {
            const operation = {identificator: id};
            const change = {products: []};
            const set = {"$set" : change};
            await this.collection.updateOne(operation,set);
        } catch (error) {
            throw new Error("No cart delete " + error);
        }
    }

    async getCartById(id) {
        try {
            const operation = {identificator: id};
            const productFound = await this.collection.find(operation).toArray();
            return productFound[0]
        } catch (error) {
            throw new Error("Cart with identificator: " + id + " not found. Error: " + error);
        }
    }

    async updateById(id,products,product) {
        try {
            const operation = {identificator: id}
            const change = {products: [...products, product]};
            const set = {"$set" : change};
            await this.collection.updateOne(operation,set);
            const newCart = this.getCartById(id);
            return newCart;
        } catch (error) {
            throw new Error("Cart with identificator: " + id + " not update. Error: " + error);
        }
    }

    async getProductsOfCart(id) {
        try {
            const operation = {identificator: id};
            const cartProducts = await this.collection.find(operation).toArray()
            return cartProducts[0].products;
        } catch (error) {
            throw new Error("Products in cart with identificator: " + id + " not found. Error: " + error);
        }
    }

    async deleteProductByIdCart(idCart, idProduct,products) {
        try {
            const productIndex = products.findIndex(prod => prod.identificator == idProduct);
            products.splice(productIndex,1);
            const newCart = products
            const operation = {identificator: idCart};
            const change = {products: newCart};
            const set = {"$set" : change};
            await this.collection.updateOne(operation,set);            
        } catch (error) {
            throw new Error("Product in cart with identificator: " + id + " not deleted. Error: " + error);
        }
    }
}