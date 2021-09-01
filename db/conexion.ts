import {Sequelize} from 'sequelize';

const db = new Sequelize('node','root', 'tuContraseña.',{
    host: 'localhost',
    dialect: 'mysql',
    //logging: true
})


export default db;