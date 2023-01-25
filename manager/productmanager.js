import fs from 'fs';

const path = './files/products.json'

export default class ProductManager {
  getProducts = async() => {
      try {
          if (fs.existsSync(path)) {
              const data = await fs.promises.readFile(path, 'utf-8');
              console.log(data);
              const products = JSON.parse(data);
              return products; 
          } else {
              return [];
          }
      } catch (error) {
          console.log(error);
      }
  }

   addProduct = async(product) => {
      const products = await this.getProducts();
      if (products.length === 0) {
          product.id = 1;
      } else {
          product.id = products[products.length -1].id + 1;
      }
      products.push(product);
      
      await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
      return product;
  }

  
  async  getProductById(id) {

    try {
      const array = await this.getProducts()
        .then((res) => res)
        .catch((err) => {
          throw err;
        });
      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          return array[i];
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(obj) {
    try {
      const array = await this.getProducts()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length <= 0) {
        obj.id = 1;
        array.push(obj);
        const data = JSON.stringify(array);
        fs.writeFileSync(path, data, "utf-8");
        return obj.id;
      }
      obj.id = array.length + 1;
      array.push(obj);
      const data = JSON.stringify(array);
      fs.writeFileSync(path, data, "utf-8");
      return obj.id;
    } catch (error) {
      throw error;
    }
  }

  async deleteProducts() {
    try {
      const array = await this.getProducts()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        fs.writeFileSync(path, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }



   
  }

