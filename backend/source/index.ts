import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";

//------

const express_server = express();
express_server.use(cors({
    origin: [
        `http://localhost:${process.env.AUTH_SERVER_PORT}`,
        `http://localhost:${process.env.SOCKET_SERVER_PORT}`,
    ],
    credentials: true,
}));
express_server.use(express.json());
express_server.use(express.urlencoded({ extended: true }));

//------

express_server.use('/api', );

express_server.get('*', (request, response) => {
    return response.status(404).json({"error": "unknown request"});
});

//-----

const portNum : number = (Number(process.env.AUTH_SERVER_PORT) || 9000);


express_server.listen()