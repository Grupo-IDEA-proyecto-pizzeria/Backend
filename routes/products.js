import { Router } from 'express';
import { 
    getProducts,
    createProduct,
    
} from '../controllers/productController.js';

export const routerProducts = Router();

routerProducts.get('/:type', getProducts );

routerProducts.get('/', getProducts );

routerProducts.put('/:id', getProducts );

routerProducts.post('/', createProduct );

routerProducts.delete('/', getProducts );




