import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SERVER_URL = "ws://localhost:7000";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [progress, setProgress] = useState(0);
    const [number, setNumber] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const newSocket = io(SERVER_URL);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            setSocket(newSocket);
        });

        newSocket.on('progress', (progress) => {
            console.log(progress);
            setProgress(progress);
        });

        newSocket.on('number', (number) => {
            // setProgress(`Process Completed, call ${number}`);
            setNumber(number)
        });

        newSocket.on('error', (error) => {
            console.log(error.reason);
        });

        newSocket.on('complete', () => {
            console.log("Successfully completed");
            setIsComplete(true)
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

    return (
        <WebSocketContext.Provider value={{ socket, progress, sendRequest, number, isComplete }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
