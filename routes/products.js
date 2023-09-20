import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
import { ProductModel } from '../models/productModel.js';
import { validationUtils } from '../utils/index.js';
import { check, checkSchema } from 'express-validator';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAllProducts);

productsRouter.get('/:id', ProductController.getProductById);

productsRouter.get('/category/:category', ProductController.getProductsByCategory);

productsRouter.post('/', [
    ProductModel.validator(),
    validationUtils.validateField
], ProductController.createProduct);

productsRouter.put('/:id', [
    ProductModel.validator(),
    validationUtils.validateField
], ProductController.editProductById);

productsRouter.delete('/:id', ProductController.deleteProductById);

