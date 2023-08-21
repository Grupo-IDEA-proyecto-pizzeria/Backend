import { response} from 'express';

// UTILS
import { DBUtils } from '../utils/DBUtils.js';
import { Helper } from '../utils/Helper.js';
import { User } from '../models/userModel.js';

// CONFIGURATION
const helper = new Helper();
const dbUtils = new DBUtils();


/**
 * Get all users
 */
// GET /api/users/
export const getAllUsers = async ( req, res = response ) => {
  try {
    const users = await dbUtils.getElements('users')

    res.status(200).json({
      info: {
        message: 'Todos los usuarios obtenidos correctamente',
        status: true
      },
      data: users.data,
      totalResults: users.totalResults
    })
  } catch( error ) {
    console.log('Error al obtener todos los usuarios', error);
    res.status(500).json({ error: 'Error al obtener todos los usuarios'})
  }
}

/**
 * Create a new User
 */
// POST /api/users
export const createUser = async ( req, res = response ) => {
    try {
        const { name, email, password, state } = req.body

        const userCreate = new User(name, email, password, state);

        const user = helper.removeEmptyValues(userCreate);
        const userAdded = await dbUtils.addElement('users', user);

        res.status(201).json({
            info: {
                message: 'Usuario agregado correctamente',
                status: true,
            },
            data: userAdded,
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}
