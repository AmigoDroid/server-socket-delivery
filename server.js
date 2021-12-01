const express = require('express');
const app = express();
const http = require('http').createServer(app);


const io = require('socket.io')(http);
const qr = require('qr-image');


function idA(){
    const idN = Math.floor(Math.random()*50**5);
    return idN;
}
//testar commit
const data = new Date();
let dia = data.getDate();
let mes = data.getMonth();
let ano = data.getFullYear();
let dataCompleta=`${dia}/${mes}/${ano}`;

const porta  = process.env.PORT||8080;
var msg ='';
const dataProsses=[];

io.on('connection',(cliente)=>{

    console.log("ID: "+cliente.id);
   
    cliente.on('info_Cliente',(info)=>{
       //ouvindo

   })

   cliente.on('pedido',(quem)=>{
       //salvar o pedido no tempo de execução
       dataProsses.push(quem);
       console.log(quem);
    
       cliente.broadcast.emit('allPedidos',dataProsses);

   })


   cliente.on('disconnect',(ig)=>{
       console.log('desconectado: '+ig.id);
   })


})
app.get('/QRcode',(req,res)=>{
    const obj = {
        id:idA(),
        nome:'nome',
        data:`${dia}/${mes}/${ano}`
    }
    const code = qr.image(JSON.stringify(obj),{type:'svg'});
    res.type('svg');
    console.log(obj.id);
    code.pipe(res);
})

app.get('/home/:id',(req,res)=>{
    const id = req.params.id;
    res.sendFile(__dirname+"/index.html");
});
app.get('/cliente/:id',(req,res)=>{
    const id = req.params.id;
    res.sendFile(__dirname+'/cliente.html');
});


http.listen(porta,()=>{
console.log("Rodando na porta: "+porta);
})