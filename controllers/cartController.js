import { response} from 'express';

// UTILS
import { DBUtils } from '../utils/DBUtils.js';
import { Helper } from '../utils/Helper.js';
import { Cart } from '../models/cartModel.js';

// CONFIGURATION
const helper = new Helper();
const dbUtils = new DBUtils();


/**
 * Get all carts
 */
// GET /api/carts/
export const getAllCarts = async ( req, res = response ) => {
  try {
    const carts = await dbUtils.getElements('carts')

    res.status(200).json({
      info: {
        message: 'Todos los carritos obtenidos correctamente',
        status: true
      },
      data: carts.data,
      totalResults: carts.totalResults
    })
  } catch( error ) {
    console.log('Error al obtener todos los carritos', error);
    res.status(500).json({ error: 'Error al obtener todos los carritos'})
  }
}

/**
 * Create a new Cart
 */
// POST /api/carts
export const createCart = async ( req, res = response ) => {
    try {
        const { user, items, total, state } = req.body

        const cartCreate = new Cart(user, items, total, state);

        const cartEmptyValues = helper.removeEmptyValues(cartCreate);
        const cartAdded = await dbUtils.addElement('carts', cartEmptyValues);

        res.status(201).json({
            info: {
                message: 'Carrito agregado correctamente',
                status: true,
            },
            data: cartAdded,
        });
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).json({ error: 'Error al crear carrito' });
    }
}
