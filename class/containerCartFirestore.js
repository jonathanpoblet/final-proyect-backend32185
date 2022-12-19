import { firestoreDatabase } from "../clients/firestoreClient.js";

function asObj(doc) {
    return { id: doc.id, ...doc.data() }
}

export class ContainerCartFierstore {
    constructor(nameCollection) {
        this.collection = firestoreDatabase.collection(nameCollection)
    }

    async createNewCart(cart) {
        try {
            const doc = await this.collection.add(cart);
            cart.id = doc.id;
            await this.collection.doc(doc.id).update(cart)
            return cart;
        } catch (error) {
            throw new Error("No cart save " + error);
        }
    }

    async deleteProductsCart(id) {
        try {
            const cart = await this.getCartById(id)
            const docId = cart.id
            await this.collection.doc(docId).update({ products: [] });
        } catch (error) {
            throw new Error("No cart delete " + error);
        }
    }

    async getCartById(id) {
        try {
            const snapshot = await this.collection.get();
            const result = []
            snapshot.forEach(doc => {
                result.push(asObj(doc));
            })
            const cart = result.find(cart => cart.identificator === id);
            return cart;
        } catch (error) {
            throw new Error("Cart with id: " + id + " not found. Error: " + error);
        }
    }

    async updateById(id,products,product) {
        try {
            const newCart = {products: [...products, product]};
            const cart = await this.getCartById(id)
            const docId = cart.id
            await this.collection.doc(docId).update(newCart)
            return product;
        } catch (error) {
            
        }
    }

    async getProductsOfCart(id) {
        try {
            const cart = await this.getCartById(id);
            const productsOfCart = cart.products;
            return productsOfCart
        } catch (error) {
            throw new Error("No products found in cart with id: "+ id + error);
        }
    }

    async deleteProductByIdCart(idCart, idProduct, products) {
        try {
            const productIndex = products.findIndex(prod => prod.identificator == idProduct);
            products.splice(productIndex,1);
            const cart = await this.getCartById(idCart)
            const docId = cart.id
            const cartWithoutProduct = await this.collection.doc(docId).update({products: products});
            return cartWithoutProduct;
        } catch (error) {
            throw new Error("No products delete in cart with id: "+ idCart + error);
        }
    }
}