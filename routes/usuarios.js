import { Router } from 'express';
import { 
  usuariosGet, 
  usuariosPut,
  usuariosPost, 
  usuariosDelete
} from '../controllers/usuarios.js';

export const routerUsr = Router();

routerUsr.get('/', usuariosGet );

routerUsr.put('/:id', usuariosPut );

routerUsr.post('/', usuariosPost );

routerUsr.delete('/', usuariosDelete );



