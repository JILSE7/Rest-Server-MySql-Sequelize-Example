import useRouter from '../routes/usuario'
import express, {Application, json} from 'express';

import cors from 'cors';
import db from '../db/conexion';

//Routes


class Server {

    private app: Application;
    private port:string;
    private apiPath = {
        usuarios: '/api/usuarios'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        //conexion a la base
        this.dbConexion()
        //Inicializacion de middlewares
        this.middlewares(); 
        //Definicion de mis rutas
        this.routes();
        
    }

    async dbConexion(){
        try {
                await db.authenticate();
                console.log('Base de datos online');
        } catch (error) {
            return new Error('NO se pudo conectar a la base')
            
        }
    }


    routes(){
        this.app.use(this.apiPath.usuarios, useRouter)
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //parse
        this.app.use(express.json())
        //Directiorio publico
        this.app.use(express.static('public'))
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log('>Servidor escuchando en el puerto !! '+ this.port);
        });
    };

};


export default Server;