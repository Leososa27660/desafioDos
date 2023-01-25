import ProductManager from "./manager/productmanager.js";

const manager = new ProductManager();

const productManager = async() => {
    let products = await manager.getProducts();
    console.log(products);

    const product= {
        
        title: 'Producto de prueba',
        description: 'descripción de prueba',
        price: 250,
        thumbnail:'Imagen de Prueba',
        code: 'abc12535',
        stock: 10, 

      
    };


    await manager.updateProduct({
        title: 'Producto de prueba2',
        description: 'descripción de prueba2',
        price: 350,
        thumbnail:'Imagen de Prueba2',
        code: 'yxz9876',
        stock: 3,
      })
      .then((res) => console.log(res, "\nProducto agregado con exito"));
    


    await manager.addProduct(product);

    products = await manager.getProducts();

    console.log(products);



  await manager.getProductById(3).then((res) => console.log(res));

  
  await manager.deleteProducts(2).then((res) => console.log(res));
  console.log("Producto eliminado con exito"); 
 

}

productManager();
