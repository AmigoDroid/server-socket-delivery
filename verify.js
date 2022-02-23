const jwt = require('jsonwebtoken');
const secret = 'chave-58242660'
module.exports ={
     teste() {
         console.log('Testando Server...');
     },
     verificar(obj){
         console.log('Verificando...');
         let res = false;
         const {id,nome,valor,rua,numero,idLoja,token} = obj;
         if(this.verifyToken(token)){
             //
             console.log('pedido Aprovado!');
             return true;

         }else{
             //loja invalida
             console.log('pedido Reprovado!');
             return false;
         }
     },
     verifyToken(token){
         let retorno = false;
          jwt.verify(token,secret,(err,decoded)=>{
              if(err){
                  console.log('token Invalido!');
              }else{
                  console.log('token Valido!')
                 retorno = true;
              };
          });
          return retorno;
     }
}