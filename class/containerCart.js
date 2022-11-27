import fs, { read } from 'fs';

class ContainerCart {
	#cartFile;

	constructor(cartFile){
		this.#cartFile = cartFile;
	}

	async createNewCart(cart) {
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			fs.writeFileSync(this.#cartFile, JSON.stringify([...readFile,cart] ,null,2));
			return readFile;
		} catch (error) {
			throw new Error("No cart save " + error);
		}
	}

	async deleteProductsCart(id){
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const cartIndex = await readFile.findIndex((cart) => cart.id === id);
			readFile[cartIndex] = {products: []};
			readFile[cartIndex].id = id;
			fs.writeFileSync(this.#cartFile,JSON.stringify(readFile,null,2));
			
		} catch (error) {
			throw new Error("No cart delete " + error);
		}
	}

	async getById(id) {
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const cartFound = await readFile.find((cart) => cart.id === id);
			return cartFound;
		} catch (error) {
			throw new Error("No cart found " + error);
		}
	}

	async addProductsToCart(id,body){
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const cartIndex = await readFile.findIndex((cart) => cart.id === id);
			readFile[cartIndex].products.push(body);
			fs.writeFileSync(this.#cartFile,JSON.stringify(readFile,null,2));
			return body
		} catch (error) {
			throw new Error("No cart found " + error);
		}
	}

	async getProductsOfCart(id){
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const foundCart = await readFile.find((cart) => cart.id === id);
			const productsOfFoundCart = foundCart.products;
			return productsOfFoundCart
		} catch (error) {
			throw new Error("No cart found " + error);
		}
	} 

	async deleteProductByIdCart(idCart, idProduct){
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const products = await this.getProductsOfCart(idCart);
			const productIndexFound = products.findIndex((product) => product.id == idProduct);
			const productFound = products.find((product) => product.id == idProduct);
			const indexCart = await readFile.findIndex(cart => cart.id == idCart)
			readFile[indexCart].products.splice(productIndexFound,1);
			fs.writeFileSync(this.#cartFile, JSON.stringify(readFile,null,2));
			return productFound
		} catch (error) {
			throw new Error("No cart delete " + error);
		}
	}
}

export default ContainerCart