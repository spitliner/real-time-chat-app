import process from 'node:process';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

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
expressServer.use(express.urlencoded({extended: true}));

//------

expressServer.get('*', (request, response) => response.status(404).json({error: 'unknown request'}));

//-----

const portNumber: number = (Number(process.env.AUTH_SERVER_PORT) || 9000);

expressServer.listen(portNumber);
