
const express = require('express')
const path  = require('path');


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

    io.on('connection', socket =>{
        dbOnline.push(socket.id);
        // console.log(dbOnline.length);

        io.emit('ONLINE',dbOnline.length);

        console.log('conectado: id='+socket.id);
        socket.emit('teste','Conected Server');

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
            dbOnline.splice(dbOnline.indexOf(socket.id),1);

            io.emit('ONLINE',dbOnline.length);
            
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

app.get('/home/:id',(req,res)=>{
    const id = req.params.id;
    res.render('index');
});

//ouvindo na porta 5500
server.listen(PORT||5500,()=>{
    console.log('rodando na porta '+PORT);
});


