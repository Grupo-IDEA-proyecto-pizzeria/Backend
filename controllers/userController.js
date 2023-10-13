// Third party packages
import {
  response
} from 'express';
import bcryptjs from "bcryptjs";

// Our resources
// UTILS
import { dbUtils, helper } from '../utils/index.js';
// MODELS
import { User } from '../models/userModel.js';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../config/firebase-auth.js';





export class UserController {

  /**
   * Get all users
   */
  // GET /api/users/
  static async getAllUsers (req, res = response) {
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
    } catch (error) {
      console.log('Error al obtener todos los usuarios', error);
      res.status(500).json({
        error: 'Error al obtener todos los usuarios'
      })
    }
  }

  /**
   * Create a new User
   */
  // POST /api/users
  static async createUser (req, res = response) {
    try {
      const { name, lastname, email, rol, anonymous, state, token } = req.body

      const userCreate = new User(name, lastname, email, rol, token, anonymous, state );

      const user = helper.removeEmptyValues(userCreate);

      // verificar si existe el usaurio en la base de datos
      const userExist = await dbUtils.getElementsByField('users', 'email', user.email)

      if ( userExist ) {
        res.status(409).json({
            info: {
                message: 'El usuario ya existe',
                status: false,
            }
        });
    } else {

      const userAdded = await dbUtils.addElement('users', user);

      res.status(201).json({
        info: {
          message: 'Usuario agregado correctamente',
          status: true,
        },
        data: userAdded,
      });
    
    }

    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({
        error: 'Error al crear usuario'
      });
    }
  }

  /**
   * Sing In a new User
   */
  // POST /api/users/token
  static async tokenUser (req, res = response) {
    try {
      const { email, password } = req.body

      const userCredential = await signInWithEmailAndPassword(auth , email, password)
      const userData = userCredential.user;

      res.status(201).json({
        info: {
          message: 'Token obtenido correctamente',
          status: true,
        },
        data: userData,
      });
    } catch (error) {
      console.error('Error al obtener token:', error);
      res.status(500).json({
        error: '[Error al obtener token] ' + error
      });
    }
  }


}