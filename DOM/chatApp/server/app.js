// express => express is a framework based on nodeJS
// nodemon => dev dependency => dependency which is only used during development not in production code
// socket.io => socket implemented
const express = require("express");
const { Server } = require("socket.io");
// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));
let userList =[];

io.on("connection",function(socket)
{
    console.log(socket.id + "socket created");

    socket.on("userConnected",function(userName)
    {
        let userObject = {id : socket.id , username : userName};
        userList.push(userObject);
        console.log(userList); 
        // for self
        socket.emit("online-list" , userList);
        // for other users
        socket.broadcast.emit("join",userObject);
    })
    
    socket.on("chat",function(chatObj)
    {
        socket.broadcast.emit("chatLeft",chatObj);
    })
    socket.on("disconnect",function()
    {
        let userLeft;
        let  remainingUsers = userList.filter(function(userObject)
        {
            if(userObject.id == socket.id)
            {
                userLeft = userObject;
                return false;
            }
            return true;
        })
        userList = remainingUsers;
        socket.broadcast.emit("leave",userLeft);
    })
})

server.listen(5500,function()
{
    console.log("server started at 5500 port ");
})