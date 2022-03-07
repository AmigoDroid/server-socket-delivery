const sequelize = require('sequelize');
const database = require('../config/db');


const Conection_db = database.define('dbConection', {

    id:{

        type: sequelize.INTEGER,
        allowNoll:false,
        autoIncrement:true,
        primaryKey:true
        
    },
    sala: sequelize.STRING,
  
    pedidos:sequelize.ARRAY
});
module.exports = Conection_db;