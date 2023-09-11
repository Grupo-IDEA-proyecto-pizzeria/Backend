// Third party packages
import { Router } from 'express';
import { check } from 'express-validator';

// Our resources
// CONTROLLERS
import * as UserController from '../controllers/userController.js';

// UTILS
import { validationUtils } from '../utils/index.js';


export const routerUsers = Router();

routerUsers.get('/', UserController.getAllUsers );

// routerUsers.put('/:id', usuariosPut );

routerUsers.post('/', [
  // check('name', 'El campo name es obligatorio').not().isEmpty(),
  // check('email').isEmail(),
  // validationUtils.validateField
], UserController.createUser );

// routerUsers.delete('/', usuariosDelete );



