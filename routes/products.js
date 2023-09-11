import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
import { ProductModel } from '../models/productModel.js';
import { validationUtils } from '../utils/index.js';
import { check, checkSchema } from 'express-validator';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAllProducts);

productsRouter.get('/:id', ProductController.getProductsById);

productsRouter.get('/category/:category', ProductController.getProductsByCategory);

productsRouter.post('/', [
    ProductModel.validator(),
    validationUtils.validateField
], ProductController.createProduct);


