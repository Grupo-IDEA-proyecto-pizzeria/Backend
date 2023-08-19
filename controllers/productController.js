import express from 'express';
const admin = require('../config/firebase');

const response = express.response;
const db = admin.firestore();

/**
 * Get all proudcts for category
 */
// GET /api/products
export const getProducts = async ( req, res = response ) => {
    try {
        const  { q, nombre = 'No name', apikey, page = 1, limit } = req.query
        console.log( req.query)

        res.status(201).json({
            info: {
                message: 'Productos obtenidos correctamente',
                status: true,
            },
            data: "a",
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

