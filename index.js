require('dotenv').config();
const http= require('http');
const express= require('express');
const path= require('path');
const {Server}=require('socket.io')
const app= express();
const server= http.createServer(app);
const io= new Server(server);
const port= process.env.PORT||5000;
// Socket io handle
io.on('connection',(socket)=>{
    
    socket.on('user-message',(message)=>{
        console.log(`A new user Message ${message}`)
        io.emit('message',message);
    })
});
app.use(express.static(path.resolve('./public')))
app.get("/",(req,res)=>{
    return res.sendFile('./public/index.html')
})
server.listen(port,()=>{
    console.log(`server started at ${port}`)
})
