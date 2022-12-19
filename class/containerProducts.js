import fs from 'fs';

class ContainerProducts {
  #productsFile;

  constructor(productsFile){
      this.#productsFile = productsFile;
  }

  async getAll() {
    try {
        const readFile = JSON.parse(
          await fs.promises.readFile(this.#productsFile, "utf-8")
        );
        return readFile;
    } catch (error) {
        throw new Error("No products found: " + error);
    } 
  }

  async getById(id) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#productsFile, "utf-8")
      );
      const productFound = readFile.find((product) => product.identificator == id);
      return productFound;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async save(product) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#productsFile, "utf-8")
    );
      await fs.promises.writeFile(this.#productsFile, JSON.stringify([...readFile, product],null,2));  
    } catch (error) {
      throw new Error("No product save: " + error);
  }
  }

  async changeById(id,body) {
    try {
      const readFile = JSON.parse(
        await fs.promises.readFile(this.#productsFile, "utf-8")
      );
      const foundIndex = await readFile.findIndex(product => product.identificator === id);
      const product = readFile.find(product => product.identificator = id);
      readFile[foundIndex] = { ...product,...body };
      const productUpdate = readFile[foundIndex];
      await fs.promises.writeFile(this.#productsFile, JSON.stringify(readFile,null,2));  
      return productUpdate;
    } catch (error) {
      throw new Error("No product found: " + error);
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const found = products.find(
        (product) => product.identificator === id
      )
      const productsFilter = products.filter(
        (product) => product.identificator != id
      );
      await fs.promises.writeFile(
        this.#productsFile,
        JSON.stringify(productsFilter, null, 2)
      );
      return found;
    } catch (error) {
      throw new Error("Can not delete product: " + error);
    }
  }
}

export default ContainerProducts;