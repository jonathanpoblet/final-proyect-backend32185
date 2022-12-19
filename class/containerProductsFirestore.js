import { firestoreDatabase } from "../clients/firestoreClient.js";

function asObj(doc) {
    return { id: doc.id, ...doc.data() }
}

export class ContainerProductsFirestore {
    constructor(nameCollection) {
        this.collection = firestoreDatabase.collection(nameCollection)
    }

    async getAll() {
        try {
            const snapshot = await this.collection.get();
            const result = []
            snapshot.forEach(doc => {
                result.push(asObj(doc));
            })
            return result;
        } catch (error) {
            throw new Error("No products found: " + error);
        }
    }

    async getById(id) {
        try {
            const snapshot = await this.collection.get();
            const result = []
            snapshot.forEach(doc => {
                result.push(asObj(doc));
            })
            const productFound = result.find(product => product.identificator === id);
            return productFound;
        } catch (error) {
            throw new Error("Product with identificator: " + id + "not found. Error: " + error);
        }
    }

    async save(product) {
        try {
            const doc = await this.collection.add(product); 
            product.id = doc.id;
            await this.collection.doc(doc.id).update(product);
            return product;
        } catch (error) {
            throw new Error("No product save: " + error);
        }
    }

    async changeById(id, body) {
        try { 
            const productChange = body;
            const productFound = await this.getById(id);
            const docId = productFound.id
            await this.collection.doc(docId).update(productChange);
            return productChange;
        } catch (error) {
            throw new Error("No product changed: " + error);
        }
    }

    async deleteById(id) {
        try {
            const productFound = await this.getById(id);
            const docId = productFound.id
            await this.collection.doc(docId).delete();
        } catch (error) {
            throw new Error("Can not delete product: " + " with identificator: "+ id + error);
        }
    } 

}