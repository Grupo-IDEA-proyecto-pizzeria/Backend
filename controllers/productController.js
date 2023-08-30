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
        const products = await dbUtils.getElements('products');

        res.status(200).json({
          info: {
            message: 'Todos los productos obtenidos correctamente',
            status: true
          },
          data: products.data,
          totalResults: products.totalResults
        });
    } catch( error ) {
        console.log('Error al obtener todos los productos', error);
        res.status(500).json({ error: 'Error al obtener todos los productos'})
    }
  }

/**
 * Get proudct for ID
 */
// GET /api/products/:id
export const getProductsById = async ( req, res = response ) => {

    try {
        const  { id } = req.params;

        const productDataById = await dbUtils.getElementById( 'products', id );

        res.status(200).json({
            info: {
                message: 'ID Producto se obtiene correctamente',
                status: true,
            },
            data: productDataById,
        });

    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error al obtener producto' });
    }

}

/**
 * Get all proudcts for category
 */
// GET /api/products/:category
export const getProductsByCategory = async ( req, res = response ) => {

    try {
        const  { category } = req.params;

        const productsDataCategorys = await dbUtils.getElementsByField('products', 'category', category );

        res.status(200).json({
            info: {
                message: 'Productos por Categoria obtenidos correctamente',
                status: true,
            },
            data: productsDataCategorys.data,
            total: productsDataCategorys.totalResults
        });
        

    } catch (error) {
        console.error('Error al obtener productos por categoria:', error);
        res.status(500).json({ error: 'Error al obtener productos por categoria' });
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

