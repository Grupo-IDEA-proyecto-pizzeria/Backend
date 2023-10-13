import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
import { ProductModel } from '../models/productModel.js';
import { validationUtils } from '../utils/index.js';
import { check, checkSchema } from 'express-validator';
import Middleware from '../middleware/auth.js';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAllProducts);

productsRouter.get('/:id', ProductController.getProductById);

productsRouter.get('/category/:category', ProductController.getProductsByCategory);

productsRouter.post('/', [
    Middleware.decodeToken,
    ProductModel.validator(),
    validationUtils.validateField
], ProductController.createProduct);

productsRouter.put('/:id', [
    Middleware.decodeToken,
    ProductModel.validator(),
    validationUtils.validateField
], ProductController.editProductById);

productsRouter.delete('/:id', [
    Middleware.decodeToken
], ProductController.deleteProductById);

