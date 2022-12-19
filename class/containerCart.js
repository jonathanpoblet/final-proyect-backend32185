import fs from 'fs';

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
			await fs.promises.writeFile(this.#cartFile, JSON.stringify([...readFile,cart] ,null,2));
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
			const cartIndex = await readFile.findIndex((cart) => cart.identificator === id);
			readFile[cartIndex] = {products: []};
			readFile[cartIndex].identificator = id;
			await fs.promises.writeFile(this.#cartFile,JSON.stringify(readFile,null,2));
			
		} catch (error) {
			throw new Error("No cart delete " + error);
		}
	}

	async getCartById(id) {
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const cartFound = await readFile.find((cart) => cart.identificator === id);
			return cartFound;
		} catch (error) {
			throw new Error("No cart found " + error);
		}
	}

	async updateById(id,products,product){
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const cartIndex = await readFile.findIndex((cart) => cart.identificator === id);
			readFile[cartIndex].products.push(product);
			await fs.promises.writeFile(this.#cartFile,JSON.stringify(readFile,null,2));
			return product
		} catch (error) {
			throw new Error("No cart found " + error);
		}
	}

	async getProductsOfCart(id){
		try {
			const readFile = JSON.parse(
				await fs.promises.readFile(this.#cartFile, "utf-8")
			);
			const foundCart = await readFile.find((cart) => cart.identificator === id);
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
			const productIndexFound = products.findIndex((product) => product.identificator == idProduct);
			const productFound = products.find((product) => product.identificator == idProduct);
			const indexCart = await readFile.findIndex(cart => cart.identificator == idCart)
			readFile[indexCart].products.splice(productIndexFound,1);
			await fs.promises.writeFile(this.#cartFile, JSON.stringify(readFile,null,2));
			return productFound;
		} catch (error) {
			throw new Error("No cart delete " + error);
		}
	}
}

export default ContainerCart;