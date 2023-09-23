import { response} from 'express';

// UTILS
import { DBUtils } from '../utils/DBUtils.js';
import { Helper } from '../utils/Helper.js';
import { CartModel } from '../models/cartModel.js';

// CONFIGURATION
const helper = new Helper();
const dbUtils = new DBUtils();

export class CartController {

    /**
     * Get all carts
     */
    // GET /api/carts/
    static getAllCarts = async ( req, res = response ) => {
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
    // POST /api/carts/
    static createCart = async ( req, res = response ) => {
        try {
            const { user, items, total } = req.body
    
            const cartCreate = new CartModel(user, items, total);
    
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

    /**
     * Delete a Cart
     */
    // DELETE /api/carts/:id
    static deleteCart = async ( req, res = response ) => {
        try {
            const { id } = req.params;
    
            // veirificar si el carrito existe en la base de datos
            const cartExist = await dbUtils.getElementById('carts', id)

            if ( !cartExist ) {
                
                res.status(409).json({
                    info: {
                        message: `Carrito no encontrado`,
                        status: false,
                    }
                });

            } else {

                const cartDeleted = await dbUtils.deleteElement('carts', id);
    
                res.status(201).json({
                    info: {
                        message: 'Carrito eliminado correctamente',
                        status: true,
                    },
                    data: cartDeleted,
                });

            }

        } catch (error) {
            console.error('Error al eliminar carrito:', error);
            res.status(500).json({ error: 'Error al eliminar carrito' });
        }
    }

}
