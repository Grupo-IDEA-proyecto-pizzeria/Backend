import express from 'express';

// UTILS
import { DBUtils } from '../utils/DBUtils.js';
import { Helper } from '../utils/Helper.js';
import { Product } from '../models/productModel.js';

// CONFIGURATION
const response = express.response;
const helper = new Helper();
const dbUtils = new DBUtils();


/**
 * Get all proudcts
 */
// GET /api/products/
export const getAllProducts = async ( req, res = response ) => {
  try {
    const products = await dbUtils.getElements('products')

    res.status(200).json({
      info: {
        message: 'Todos los productos obtenidos correctamente',
        status: true
      },
      data: products.data,
      totalResults: products.totalResults
    })
  } catch( error ) {
    console.log('Error al obtener todos los productos', error);
    res.status(500).json({ error: 'Error al obtener todos los productos'})
  }
}

/**
 * Get all proudcts for category
 */
// GET /api/products/:category
export const getProducts = async ( req, res = response ) => {
    try {
        const  { category, startAfter = null } = req.params;

        const productsData = await dbUtils.getElementsByFieldWithPagination('products', 'category', category, 10, startAfter);
        
        res.status(200).json({
            info: {
                message: 'Productos obtenidos correctamente',
                status: true,
            },
            data: productsData.data,
            metadata: productsData.metadata,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

/**
 * Get proudct for ID
 */
// GET /api/products/:id
export const getProductById = async ( req, res = response ) => {
  try {
      const  { id } = req.params;

      // const productsData = await dbUtils.getElementsByFieldWithPagination('products', 'category', category, 10, startAfter);
      const productData = await dbUtils.getElementById( 'products', id );
      
      res.status(200).json({
          info: {
              message: `El producto ID: ${id} se obtiene correctamente`,
              status: true,
          },
          data: productData,
      });
  } catch (error) {
      console.error('Error al obtener producto por ID: ', error);
      res.status(500).json({ error: `Error al obtener producto por ID` });
  }
}

/**
 * Create a new product
 */
// POST /api/products
export const createProduct = async ( req, res = response ) => {
    try {
        const { category, name,  price, img, description, state } = req.body

        const productCreate = new Product(category, name, price, img, description, state);

        const product = helper.removeEmptyValues(productCreate);
        const productAdded = await dbUtils.addElement('products', product);

        res.status(201).json({
            info: {
                message: 'Producto agregado correctamente',
                status: true,
            },
            data: productAdded,
        });
    } catch (error) {
        console.error('Error al crear productos:', error);
        res.status(500).json({ error: 'Error al crear productos' });
    }
}

