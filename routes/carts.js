// Paquetes de terceros
import { Router } from 'express';
import { check } from 'express-validator';

// Nuestros recursos
// CONTROLLER
import { CartController } from '../controllers/cartController.js';

// UTILS
import { validationUtils } from '../utils/index.js';
import { CartModel } from '../models/cartModel.js';

export const routerCarts = Router();

routerCarts.get('/', CartController.getAllCarts );

routerCarts.post('/', [
    CartModel.validator(),
    validationUtils.validateField
], CartController.createCart );

// routerCarts.put('/:id', cartsPut );

routerCarts.delete('/:id', CartController.deleteCart );


