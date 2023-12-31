// Paquetes de terceros
import { Router } from 'express';
import { check } from 'express-validator';

// Nuestros recursos
// CONTROLLER
import { CartController } from '../controllers/cartController.js';

// UTILS
import { validationUtils } from '../utils/index.js';
import { CartModel } from '../models/cartModel.js';
import Middleware from '../middleware/auth.js';


export const routerCarts = Router();

routerCarts.get('/', CartController.getAllCarts );

routerCarts.post('/', [
    Middleware.decodeToken,
    CartModel.validator(),
    validationUtils.validateField
], CartController.createCart );

routerCarts.put('/:id', [
    Middleware.decodeToken,
    CartModel.validator(),
    validationUtils.validateField
], CartController.editCartById );

routerCarts.delete('/:id', [
    Middleware.decodeToken
], CartController.deleteCart );


