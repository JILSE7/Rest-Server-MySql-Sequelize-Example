"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("../routes/usuario"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conexion_1 = __importDefault(require("../db/conexion"));
//Routes
class Server {
    constructor() {
        this.apiPath = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //conexion a la base
        this.dbConexion();
        //Inicializacion de middlewares
        this.middlewares();
        //Definicion de mis rutas
        this.routes();
    }
    dbConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                console.log('Base de datos online');
            }
            catch (error) {
                return new Error('NO se pudo conectar a la base');
            }
        });
    }
    routes() {
        this.app.use(this.apiPath.usuarios, usuario_1.default);
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        //parse
        this.app.use(express_1.default.json());
        //Directiorio publico
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('>Servidor escuchando en el puerto !! ' + this.port);
        });
    }
    ;
}
;
exports.default = Server;
//# sourceMappingURL=Server.js.map