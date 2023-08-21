import { Router } from 'express';
import * as UserController from '../controllers/userController.js';

export const routerUsers = Router();

routerUsers.get('/', UserController.getAllUsers );

// routerUsers.put('/:id', usuariosPut );

routerUsers.post('/', UserController.createUser );

// routerUsers.delete('/', usuariosDelete );



