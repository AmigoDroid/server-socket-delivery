
const express = require('express')
const path  = require('path');

//funciona
const app = express();
// const jwt = require('jsonwebtoken');
// const secret = 'JLAcessoriosToken';
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*"}});
const verify = require('./verify');
const clientDB = require('./database/client/clientDB');


const PORT = process.env.PORT ||5500;
const ws = require('./socket.io');

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,"public"));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');




    io.on('connection', socket =>{
        // console.log(dbOnline.length);
        console.log('conectado: id='+socket.id);

        socket.emit('teste','Conected Server');

        socket.on('tokenVerify',token=>{
            const ressp = verify.verifyToken(token);
            socket.emit('validateToken',ressp);
        })

        socket.on('logar',(obj)=>{
              ws.logar(obj,socket.id);
               atualizar();
        })

        socket.on('pedidos',(objs)=>{
            
            console.log('novo pedido!');
            const verifyRes = verify.verificar(objs);
            veryResult(verifyRes,objs)

        });
        
        socket.on('login', user =>{
          
            console.log('============');
            logando(user);

        })

        async function logando(user){
            const res = await clientDB.login(user);
            console.log(res);
            socket.emit('response',res);
        }

        function veryResult(boolean,objs){
            if(boolean){
                pedidoFeito(true,token);
                io.emit("ConectId:"+objs.idLoja,objs)
            }else{
                pedidoFeito(false,objs.token)
            }
        }

        socket.on('disconnect',()=>{
            console.log("desconect "+socket.id);

            ws.desconectado(socket.id);
            atualizar();
            
            // console.log(dbOnline.length);
        });
        
        });
        //respondendo para o cliente o resultado do pedido
       
        function pedidoFeito(estado,token){

            const resposta = {
                estado:estado,
                msgV:"pedido Realizado com sucesso",
                msgF:"Ocorreu um Erro!"
            }
            io.emit(token,resposta);
            console.log('============================');
        }

        function atualizar(){
            const  {admin,cliente,online} = ws.dadosOnline();
            io.emit('ONLINE',{cliente:cliente,admin:admin,online:online});
         }





app.get('/home/:id',(req,res)=>{
    const id = req.params.id;
    res.render('index');
});

//ouvindo na porta 5500
server.listen(PORT||5500,()=>{
    console.log('rodando na porta '+PORT);
});


