import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import Utilities from "../Utilities";
import Server from "../Server";
import { SOCKET } from "../../common/Const";


class SendEvents {
    #socket;
    constructor(socket) {
        this.#socket = socket
    }
    sendUpdate(message) {
        this.#socket.emit("progress", message);
    }
    sendNumber(number) {
        this.#socket.emit("number", number);
    }
    sendError(message) {
        this.#socket.emit("error", message);
    }
    sendComplete() {
        this.#socket.emit("complete");
    };
}

export default function startWebSocketServer() {
    const httpServer = createServer();
    const io = new SocketServer(httpServer, {
        cors: {
            origin: SOCKET.CLIENT,
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        Utilities.showNotice(`Client connected : ${socket.id}`);
        const events = new SendEvents(socket);
        let timer = 21000;
        const interval = 1000;
        let intervalId;

        socket.on('disconnect', () => {
            clearInterval(intervalId);
            Utilities.showNotice(`Client disconnected : ${socket.id}`);
        });

        socket.on("request", async (url) => {
            try {
                console.log(url);
                intervalId = setInterval(() => {
                    timer = timer - interval
                    if (timer >= 0) {
                        events.sendUpdate(`${timer / interval}`)
                    }
                }, interval);
                let phone = await Server.Vapi.updateAssistantFile(url)
                clearInterval(intervalId);
                events.sendUpdate(`0`)
                if (phone) {
                    events.sendNumber(phone);
                }
                events.sendComplete();
            } catch (error) {
                clearInterval(intervalId);
                events.sendError(error.message);
            }
        })
    });

    httpServer.listen(SOCKET.PORT, () => {
        Utilities.showStatus(`WebSocket server listening on port ${SOCKET.PORT}`);
    });
}

