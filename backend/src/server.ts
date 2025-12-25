import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import "socket.io";

declare module "socket.io"{
    interface SocketData{
        roomId?: string;
    }
}
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // "http://localhost:5173","http://localhost:4173"
        origin:"*",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "*"
}))

app.use(express.json())

const allRoomId = new Set<string>();
const generateRoomId = () => {
    let generatedNumber: string;
    do {
        generatedNumber = String(Math.floor(100000 + Math.random() * 900000))
    } while (allRoomId.has(generatedNumber))

    allRoomId.add(generatedNumber)
    return generatedNumber

}

app.get("/api/create-room", (_, res) => {
    try {
        let roomId = generateRoomId()
        res.json({ "roomId": roomId })
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" })
    }
})

app.get("/api/join-room/:roomId", (req:express.Request<{roomId: string}>, res) => {
    try {
        let { roomId } = req.params
        if (!allRoomId.has(roomId)) return res.status(404).json({ "error": "Room not found" })
        res.json({ "roomId": roomId })
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" })
    }
})

interface Message {
    roomId: string;
    message: string;
    sender: string
}

io.on('connection', (socket) => {
    console.log("user connected ", socket.id);

    socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
        socket.data.roomId = roomId
        console.log(`${socket.id} have joined ${roomId}`)
    });

    socket.on("send-message", (data: Message) => {
        socket.to(data.roomId).emit("receive-message", data)
        console.log(data)
    }
    );

    socket.on("leave-room", () => {
        const roomId = socket.data.roomId;

        if (!roomId) return

        socket.leave(roomId);
        socket.data.roomId = undefined

        const room = io.sockets.adapter.rooms.get(roomId)

        if (!room || room.size === 0) {
            console.log(`room ${roomId} is empty now`)
            allRoomId.delete(roomId)
        }

    })

    socket.on("disconnect", () => {
        const roomId = socket.data.roomId;
        if (!roomId) return;

        const room = io.sockets.adapter.rooms.get(roomId)

        if (!room || room.size === 0) {
            console.log(`room ${roomId} is empty now`)
            allRoomId.delete(roomId)
        }

        console.log("user disconnected", socket.id)
    })
})

server.listen(5001, () => {
    console.log('running on 5001')
})
