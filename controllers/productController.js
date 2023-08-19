import express from 'express';
import admin from './../config/firebase.js';

// UTILS
import { DBUtils } from '../utils/DBUtils.js';
import { Helper } from '../utils/Helper.js';
// import { ValidationUtils } from '../utils/validationUtils.js';

// CONFIGURATION
const response = express.response;
const db = admin.firestore();
// const validationUtils = new ValidationUtils();
const helper = new Helper();
const dbUtils = new DBUtils();



/**
 * Get all proudcts for category
 */
// GET /api/products/:type
export const getProducts = async ( req, res = response ) => {
    try {
        const  { type } = req.params;
        const { startAfter = null } = req.query;

        const productsData = await dbUtils.getElementsByFieldWithPagination('products', 'type', type, 10, startAfter);
        
        res.status(201).json({
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
 * Create a new product
 */
// POST /api/products
export const createProduct = async ( req, res = response ) => {
    try {
        const  { name, description, type, price } = req.body

        const newProduct = {
            name,
            description,
            type,
            price,
        };

        const product = helper.removeEmptyValues(newProduct);
        const productAdded = await dbUtils.addElement('products', product);

        res.status(201).json({
            info: {
                message: 'Productos agregado correctamente',
                status: true,
            },
            data: productAdded,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

