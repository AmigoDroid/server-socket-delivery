const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const porta  = process.env.PORT||8080;





server.listen(3000,()=>{
console.log(location.host+""+porta);
})