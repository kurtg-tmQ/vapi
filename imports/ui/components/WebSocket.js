import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SERVER_URL = "ws://localhost:7000";

const useWebSocket = () => {
    const [socket, setSocket] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const newSocket = io(SERVER_URL);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            setSocket(newSocket);
        });

        newSocket.on('progress', (progress) => {
            console.log(progress)
            setProgress(progress);
        });

        newSocket.on('number', (number) => {
            setProgress(`Process Completed, call ${number}`)
        });

        newSocket.on('error', (error) => {
            console.log(error.reason)
        });
        newSocket.on('complete', () => {
            console.log("Successfully completed")
        });
        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    const sendRequest = (inputValue) => {
        if (socket) {
            socket.emit('request', inputValue);
            console.log('Sent data to server:', inputValue);
        } else {
            console.error('Socket not connected');
        }
    };

    return { socket, progress, sendRequest };
};

export default useWebSocket;
