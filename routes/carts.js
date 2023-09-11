// Paquetes de terceros
import { Router } from 'express';
import { check } from 'express-validator';

// Nuestros recursos
// CONTROLLER
import * as CartController from '../controllers/cartController.js';

// UTILS
import { validationUtils } from '../utils/index.js';

export const routerCarts = Router();

routerCarts.get('/', CartController.getAllCarts );

// routerCarts.put('/:id', cartsPut );

routerCarts.post('/', [
  check('user', 'El campo user es obligatorio').not().isEmpty(),
  validationUtils.validateField
], CartController.createCart );

// routerCarts.delete('/', cartsDelete );


