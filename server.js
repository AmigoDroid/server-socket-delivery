
const express = require('express');
const path  = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*"}});

//=======================//

const verify = require('./verify');
const clientDB = require('./database/client/clientDB');
const PORT = process.env.PORT || 5500;
const ws = require('./socket.io');


    io.on('connection', socket =>{
        console.log('conected:'+socket.id);
        socket.emit('teste','Olá Mundo!');
        
        socket.on('login',obj=>{
            console.log('login...');
            login(obj);
        });

        socket.on('session',obj=>{
           const  res = verify.verifyToken(obj.token);
           if(res){
                socket.join(obj.sala);
           }else{
               emitir('falha','ocorreu um erro desconhecido');
           }
        });

        socket.on('login_Loja',obj=>{
            console.log('login loja...');
            loginLoja(obj);
        })
    
    
        socket.on('disconnect',()=>{
            console.log("desconect "+socket.id);

            ws.desconectado(socket.id);

            atualizar();
        });

        socket.on('Pedir',obj=>{
            const token = obj.token;
            const res = verify.verifyToken(token);
            const body={
                estado:res,
                msgV:'Pedido Realizado!',
                msgF:'Ocorreu um erro!'
            }
            if(res){
                MSala(obj.nomeLoja)
                emitir('Res_Pedir',body)
                emitir('pedidos',obj);

            }
        })



          
    //========FUNÇÕES===========//
    
    function emitir(emit,obj){
        socket.emit(emit,obj);
    }
    function MSala(sala){
        socket.join(sala);
    }

        
        function atualizar(){
            const  {admin,cliente,online} = ws.dadosOnline();
            emitir('ONLINE',{cliente:cliente,admin:admin,online:online});
         }
         async function login(user){
            const res = await clientDB.login(user);
            console.log(res);
            emitir('resLogin',res);
        }
        async function loginLoja(obj){
            const res = await clientDB.loginLoja(obj);
            if(res.login){
                socket.join(res.nome);
                console.log('SOCKET MOVIDO PARA A SALA '+res.nome);
            }
            emitir('res_Loja',res)
        }

    });
    
  

        //rota de erro 404
        app.use(function(req, res, next) {
            res.status(404).send("Esta rota não existe");
        });

//ouvindo na porta 5500
server.listen(PORT||5500,()=>{
    console.log('rodando na porta '+PORT);
});