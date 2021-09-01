import {DataType, DataTypes} from 'sequelize';
import db from '../db/conexion';


const Usuario = db.define('usuario',{
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true

    },
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.TINYINT,
        defaultValue: '1'
    }

})



export default Usuario;