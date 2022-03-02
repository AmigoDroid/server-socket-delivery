
const express = require('express')
const path  = require('path');

//funciona
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*"}});
const jwt = require('jsonwebtoken');
const secret = 'JLAcessoriosToken';

const verify = require('./verify');

const PORT = process.env.PORT ||5500;

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,"public"));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

const dbOnline=[];
const DBlistCliente=[];
const adminListOnline=[];
const dadosCoxesion={
    online:{},
    clientes:{},
    admins:{}

}

    io.on('connection', socket =>{
        // console.log(dbOnline.length);
        console.log('conectado: id='+socket.id);

        socket.emit('teste','Conected Server');
        //login paia
        socket.on('logar',(obj)=>{

            const res= obj;

            if(res=='admin'){

               dadosCoxesion.admins['admin']={id:socket.id};
                atualizar();

            }else{

                dadosCoxesion.clientes[obj]={id:socket.id};
                dadosCoxesion.online[socket.id]={id:socket.id};
                atualizar();

            }
        })
        socket.on('pedidos',(objs)=>{
            
            console.log('novo pedido!');
           
            //verificando pedido
            const verifyResult = verify.verificar(objs);
            //verificando resultado do pedido
            if(verifyResult){
                pedidoFeito(true,objs.token)
                io.emit("ConectId:"+objs.idLoja,objs)
            }else{
                pedidoFeito(false,objs.token)
            }

        });

        socket.on('disconnect',()=>{
            console.log("desconect "+socket.id);

            delete dadosCoxesion.online[socket.id];
            delete dadosCoxesion.admins[socket.id];
            // dbOnline.splice(dbOnline.indexOf(socket.id),1);

            // adminListOnline.splice(adminListOnline.indexOf(socket.id),1);
            atualizar();
            
            // console.log(dbOnline.length);
        })
        
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
            const conection = dadosCoxesion;
            io.emit('ONLINE',{online:conection.online.length,cliente:conection.clientes.length,admin:conection.admins.length});
        }

app.get('/home/:id',(req,res)=>{
    const id = req.params.id;
    res.render('index');
});

//ouvindo na porta 5500
server.listen(PORT||5500,()=>{
    console.log('rodando na porta '+PORT);
});


