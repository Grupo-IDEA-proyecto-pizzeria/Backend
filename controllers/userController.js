// Third party packages
import { response } from 'express';
import bcryptjs from "bcryptjs";

// Our resources
// UTILS
import { dbUtils, helper } from '../utils/index.js';
// MODELS
import { User } from '../models/userModel.js';

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
        const { name, email, state } = req.body

        const userCreate = new User(name, email, state);

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
