import Product from "../models/Product.js";

async function getProducts(req, res){
    const products = await Product.find();
    return res.status(200).json(products);
}

async function createProduct(req, res) {
    const prod = req.body
    const newProd = await Product.create(prod)
    return res.status(201).json(newProd);
}

async function deleteProduct(req, res) {
    const id = req.params.id
    await Product.findByIdAndDelete({_id: id})
    return res.status(200).json({ res: "Product Deleted"});
}

async function updateProduct(req, res) {
    const id = req.params.id;
    const updatedProduct = req.body;
  
    try {
      const product = await Product.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
}

export { getProducts, createProduct, deleteProduct, updateProduct };