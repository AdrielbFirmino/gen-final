import { Router } from 'express';
import { getProducts, createProduct, deleteProduct, updateProduct } from './controllers/ProductController.js';

const routes = Router();

routes.get('/products', getProducts);
routes.post('/products', createProduct);
routes.delete('/products/:id', deleteProduct);
routes.put('/products/:id', updateProduct); 

export default routes;