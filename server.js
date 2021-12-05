
const express = require('express')
const path  = require('path');


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,"public"));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

//armazaenar as mensagens
var datamsg =[];

    io.on('connection', socket =>{

        console.log('conectado: id='+socket.id);
        
        });

    


app.get('/',(req,res)=>{
    res.render('index');
});

//ouvindo na porta 3000
server.listen(PORT||5500,()=>{
    console.log('rodando na porta 5500');
});


