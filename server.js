
const express = require('express')
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
        
        socket.on('login',obj=>{
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
            loginLoja(obj);
        })
    
    
        socket.on('disconnect',()=>{
            console.log("desconect "+socket.id);

            ws.desconectado(socket.id);

            atualizar();
        });

        function emitir(emit,obj){
            socket.emit(emit,obj);
        }
        });


        //========FUNÇÕES===========//


        
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
            emitir('resLoja',res)
        }

        //rota de erro 404
        app.use(function(req, res, next) {
            res.status(404).send("Esta rota não existe");
        });

//ouvindo na porta 5500
server.listen(PORT||5500,()=>{
    console.log('rodando na porta '+PORT);
});