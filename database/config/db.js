const Sequelize = require('sequelize');
const config = require('./confgDB');

const sequelize = new Sequelize(config.database,config.user,config.password,{
    dialect:config.dialect,
    host:config.host
});
  sequelize.authenticate().then(() => {
    console.log('');
    console.log('');
    console.log('==========   CONECTADO  ============');
    console.log('');
    console.log('');
  })
  .catch(err => {
    console.log('');
    console.log('');
    console.error('=========  NÃO CONECTADO  ========', err);
    console.log('');
    console.log('');
  });

  module.exports = sequelize;
 


  //Cliente.sync()