import { Router } from 'express';
import * as ProductController from '../controllers/productController.js';

export const routerProducts = Router();

routerProducts.get('/', ProductController.getAllProducts);

routerProducts.get('/:id', ProductController.getProductsById);

routerProducts.get('/category/:category', ProductController.getProductsByCategory);

routerProducts.post('/', ProductController.createProduct);


