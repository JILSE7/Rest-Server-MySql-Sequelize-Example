import dotenv from 'dotenv';
import Server from './models/Server';

//Configurar dotend
dotenv.config();
//Instancia del servidor
const server = new Server();
server.listen()

