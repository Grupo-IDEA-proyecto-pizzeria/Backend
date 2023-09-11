import { response } from 'express';

// UTILS
import { DBUtils } from '../utils/DBUtils.js';
import { Helper } from '../utils/Helper.js';
import { ProductModel } from '../models/productModel.js';

// CONFIGURATION
const helper = new Helper();
const dbUtils = new DBUtils();



export class ProductController {

    /**
     * Get all proudcts
     */
    // GET /api/products/
    static async getAllProducts ( req, res = response ) {
        try {
            const products = await dbUtils.getElements('products');
            console.log(products);

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
    static async getProductsById ( req, res = response ) {

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
    static async getProductsByCategory ( req, res = response ) {

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
    static async createProduct ( req, res = response ) {

        try {
            const { category, name,  price, img, description, state } = req.body

            const productCreate = new ProductModel(category, name, price, img, description, state);

            // veirificar si el producto name existe en la base de datos
            const productExist = await dbUtils.getElementsByField('productsTest', 'name', productCreate.name)

            if ( productExist ) {
                res.status(409).json({
                    info: {
                        message: 'El producto ya existe',
                        status: false,
                    }
                });
            } else {

                const product = helper.removeEmptyValues(productCreate);

                const productAdded = await dbUtils.addElement('productsTest', product)
    
                res.status(201).json({
                    info: {
                        message: 'Producto agregado correctamente',
                        status: true,
                    },
                    data: productAdded,
                });
            }

        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ error: 'Error al crear producto' });
        }
    }

}





