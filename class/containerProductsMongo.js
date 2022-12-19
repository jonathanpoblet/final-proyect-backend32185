import { mongoDatabase } from "../clients/mongoClient.js";

export class ContainerProductsMongoDB {
    constructor(collection) {
        this.collection = mongoDatabase.collection(collection);
    }

    async getAll(term = {}) {
        try {
            const products = await this.collection.find(term).toArray();
            return products;
        } catch (error) {
            throw new Error("No products found: " + error);
        }
    }

    async getById(id) {
        try {
            const operation = {identificator: id};
            const productFound = await this.collection.find(operation).toArray();
            return productFound[0];
        } catch (error) {
            throw new Error("Product with identificator: " + id + "not found. Error: " + error);
        }    
    }

    async save(product) {
        try {
            await this.collection.insertOne(product);
        } catch (error) {
            throw new Error("No product save: " + error);
        }
    }

    async changeById(id,body) {
        try {
            const operation = {identificator: id};
            const change = body;
            const set = {"$set" : change};
            await this.collection.updateOne(operation,set);
        } catch (error) {
            throw new Error("No product changed: " + error);
        }
    }

    async deleteById(id) {
        try {
            const operation = {identificator: id};
            await this.collection.deleteOne(operation);
        } catch (error) {
            throw new Error("Can not delete product: " + " with id: "+ id + error);
        }
    }
}