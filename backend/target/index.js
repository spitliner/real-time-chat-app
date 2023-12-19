import process from 'node:process';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './router/auth-router.js';
dotenv.config();
//------
const expressServer = express();
expressServer.use(cors({
    origin: [
        `http://localhost:${process.env.AUTH_SERVER_PORT}`,
        `http://localhost:${process.env.SOCKET_SERVER_PORT}`,
    ],
    credentials: true,
}));
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));
//------
expressServer.use('/api', authRouter);
expressServer.get('*', (request, response) => response.status(404).json({ error: 'unknown request' }));
//------
mongoose.connection.on('open', () => {
    // console.log(ref);
    console.log('Connected to mongo server.');
});
mongoose.connection.on('error', error => {
    console.log('Could not connect to mongo server!');
    console.log(error);
});
// mongoose.set('debug', true);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, { dbName: process.env.DB_NAME }); // eslint-disable-line @typescript-eslint/no-floating-promises
//------
const portNumber = (Number(process.env.AUTH_SERVER_PORT) || 9000);
expressServer.listen(portNumber, () => {
    console.log('Server started on port ' + portNumber);
});
//------
