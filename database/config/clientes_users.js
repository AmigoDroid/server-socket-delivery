
const sequelize = require('sequelize');
const database = require('../config/db');


const Cliente_users = database.define('clientesUsers', {

    id:{

        type: sequelize.INTEGER,
        allowNoll:false,
        autoIncrement:true,
        primaryKey:true
        
    },
    nome: sequelize.STRING,
  
    rua:sequelize.STRING,

    numero:sequelize.STRING,
    
    referencia: sequelize.STRING,

    telefone:sequelize.STRING,

    password:sequelize.STRING
});
module.exports = Cliente_users;