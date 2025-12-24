import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

interface Message {
    roomId: string;
    message: string;
    sender: string
}

io.on('connection', (socket) => {
    console.log("user connected ", socket.id);

    socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
        console.log(`${socket.id} have joined ${roomId}`)
    });

    socket.on("send-message", (data: Message) => {
            socket.to(data.roomId).emit("receive-message", data)
        }
    );

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})

server.listen(5001, () => {
    console.log('running on 5001')
})
