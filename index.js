import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import router from './Routes/userRoutes.js'
import messageRoute from "./Routes/messageRoutes.js";
import {Server} from "socket.io"
import { config } from "dotenv";
config();
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("mongoserver is conncected")).catch((err)=> console.log(err));

const app = express();

app.use(express.json());
app.use(cors({origin: "https://chatio-a9935.web.app"}));
app.use('/api/auth' , router)
app.use('/api/message' , messageRoute)


const port = process.env.PORT || 3001

const server = app.listen(port , ()=>{
    console.log(`server is started `)
})

const io = new Server(server , {
    cors:{
        origin: "https://chatio-a9935.web.app",
        credentials: true
    }
})

//node.js global object

global.onlineUsers = new Map();
io.on("connection" , socket =>{
    global.chatSocket = socket
    socket.on("add-usr" , (userId)=>{
        onlineUsers.set(userId,socket.id);
        // console.log(userId)
    })
    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("message-rcv" , data.message)
        }
    })
})


