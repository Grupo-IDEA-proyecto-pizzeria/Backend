// Paquetes de terceros
require('dotenv').config();

// Nuestros recursos
const Server = require('./models/server');

const server = new Server();

server.listen();