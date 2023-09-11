import express from 'express'; 
import cors from 'cors';

import { routerUsers } from '../routes/users.js';
import { productsRouter } from '../routes/products.js';
import { routerCarts } from '../routes/carts.js';

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // Se agregan las siguientes variables para el uso de las rutas
    this.path = {
      users:    '/api/users',
      products: '/api/products',
      carts:    '/api/carts',
    }

    // Middlewares
    this.middlewares();

    // Rutas de la app
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    // Directorio público
    this.app.use( express.static('public') );
  }
  
  routes() {
    // Rutas para el uso de app
    this.app.use( this.path.users, routerUsers);
    this.app.use( this.path.products, productsRouter);
    this.app.use( this.path.carts, routerCarts);

    // Error 404
    this.app.use('*', (req, res) => {
      res.status(400).send('<h1>404 - Page not found</h1>');
    });

  }

  listen() {
    this.app.listen( this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }

}

export default Server;
