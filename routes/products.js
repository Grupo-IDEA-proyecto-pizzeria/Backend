import { Router } from 'express';
import * as ProductController from '../controllers/productController.js';

export const routerProducts = Router();

routerProducts.get('/', ProductController.getAllProducts);

routerProducts.get('/:category', ProductController.getProducts);

routerProducts.post('/', ProductController.createProduct);


