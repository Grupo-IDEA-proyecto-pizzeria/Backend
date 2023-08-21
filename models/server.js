import express from 'express'; 
import cors from 'cors';

import { routerUsers } from '../routes/users.js';
import { routerProducts } from '../routes/products.js';

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Se agregan las siguientes variables para el uso de las rutas
    this.usersPath = '/api/users';
    this.productsPath = '/api/products';

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
    // Ruta para usuarios
    this.app.use( this.usersPath, routerUsers);
    this.app.use( this.productsPath, routerProducts);

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