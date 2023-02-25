import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import env from 'dotenv';
import path from 'path';
import socket from 'socket.io';

import userRoute from './routes/user.route';
import messageRoute from './routes/message.route';
import roomRouter from './routes/room.route';

const app = express();
env.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/image', express.static(path.join(__dirname + `\\images`)));

mongoose.connect(process.env.MONGO_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
}).then(() => {
       console.log("Connect mongodb success");
}).catch((error) => {
       console.log("Error connecting" + error.message)
})

app.use('/api', userRoute);
app.use('/api', messageRoute);
app.use('/api', roomRouter);

const server = app.listen(process.env.PORT, () => {
       console.log(`Server running : http://localhost:${process.env.PORT}`);
})

const io = socket(server, {
       cors: {
              origin: 'http://localhost:5173', 
              credentials: true
       }
});

const onlineUsers = new Map();
const userJoinRooms = new Map();

// io.on : user đang online 
io.on("connection", (socket) => {
       socket.on("user-online",  (userId) => {
              onlineUsers.set(userId, socket.id); 
       });

       socket.on('join__rooms', data => {
              userJoinRooms.set(data, socket.id);
       })

       socket.on("send-message", (data) => {
              const sendUserSocket = onlineUsers.get(data.to);
              if(sendUserSocket) {
                     io.to(sendUserSocket).emit('recieve-message', {
                            message: data.message,
                            reply: data.reply
                     });
              } else {
                     const room = userJoinRooms.get(data.to);
                     if(room) {
                            socket.broadcast.emit('rooms', {
                                   message: data.message,
                                   reply: data.reply
                            })
                     }
              }
       })
});

// Gửi cho tất cả client trong room 'game' ngoại trừ người gửi
// socket.to('game').emit('nice game', "let's play a game");
// socket.broadcast.emit() -> Người gửi ko nhận được, còn lại tất cả nhận đc
// io.sockets.emit() -> Tất cả nhận được
// socket.emit() -> Chỉ người gửi nhận được 
