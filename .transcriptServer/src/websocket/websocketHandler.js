import { MediaStream } from "./MediaStream.js";
import Logger from "../helpers/Logger.js";
import { v4 as uuid } from "uuid";

const mediasStreams = {};

const handleClose = (id) => {
    Logger.showNotice('WebSocket connection closed', id);
    if (mediasStreams[id]) {
        delete mediasStreams[id];
    }
};

export const handleConnection = (ws) => {
    const id = uuid();
    Logger.showNotice('New WebSocket connection', id);
    mediasStreams[id] = new MediaStream(ws, id, handleClose);
};

