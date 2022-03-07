const clientDB = require('./database/client/clientDB');
const socket = require('./server');

const Online=[];
const Clientes=[];
const adminOnline=[];

module.exports = { 

    conect(obj,id){
       const res= obj;
      if(res=='admin'){
        adminOnline.push(id);
      }else{
        Clientes.push(obj);
        Online.push(id);
      
    }
},
    desconectado(id){
        Online.splice(Online.indexOf(id),1);
        adminOnline.splice(adminOnline.indexOf(id),1);
    },
    dadosOnline(){
        const dados ={
            online:Online.length,
            cliente:Clientes.length,
            admin:adminOnline.length
        } 
        return dados;
     },
     login(){
     }

}