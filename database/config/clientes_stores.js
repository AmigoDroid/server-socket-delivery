
const sequelize = require('sequelize');
const database = require('../config/db');


const Cliente = database.define('clientes', {

    id:{

        type: sequelize.INTEGER,
        allowNoll:false,
        autoIncrement:true,
        primaryKey:true
        
    },
    nome: sequelize.STRING,
  
    descrision:sequelize.STRING,

    telefone:sequelize.STRING,
        
    itens:{
        type:sequelize.JSON
    },
  
    username:sequelize.STRING,
  
    password:sequelize.STRING,

    });
module.exports = Cliente;