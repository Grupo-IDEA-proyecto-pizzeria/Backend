// Third party packages
import 'dotenv/config.js'

// Our resources
import Server from './models/server.js';


const server = new Server();

server.listen();