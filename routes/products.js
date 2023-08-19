import { Router } from 'express';
import { 
    getProducts, 
} from '../controllers/productController.js';

export const routerProducts = Router();

routerProducts.get('/', getProducts );

routerProducts.get('/', getProducts );

routerProducts.put('/:id', getProducts );

routerProducts.post('/', getProducts );

routerProducts.delete('/', getProducts );




