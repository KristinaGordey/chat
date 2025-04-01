import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import route from './route.js';
import { addUser, findUser } from './users.js';



const app = express();
app.use(cors({origin: "*"})); //могут быть проблемы, запросы из любых источников
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket)=>{
    socket.on('join', ({name, room})=>{
        socket.join(room);

        const {user} = addUser({name, room});

        socket.emit('message', {
            data:{user:{name:"Admin"}, message:`Hey ${user.name}`},
        });

        socket.broadcast.to(user.room).emit('message', {
            data:{user:{name:"Admin"}, message:`${user.name} has joined`},

        })
        socket.on('sendMessage', ({message, params})=>{
            const user = findUser(params);

            if(user){
                io.to(user.room).emit('message',{data:{user,message}});
            }
        })

    });


    socket.on('disconnect', ()=>{
        console.log("Disconnect");
    });
});

server.listen(5000, () => {
    console.log('Server is running');
});